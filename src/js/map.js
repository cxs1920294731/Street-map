var map;
// var positionArray=[
//     {
//         uluru:{
//             lat: 23.117,
//             lng: 113.275,
//         },
//         name:'广州',
//         mark:null,
//     },
//     {
//         uluru:{
//             lat: 22.5,
//             lng: 114.0,
//         },
//         name:'深圳',
//         mark:null,
//     }, {
//         uluru:{
//             lat: 22.4,
//             lng: 114.1,
//         },
//         name:'香港',
//         mark:null,
//     },{
//         uluru:{
//             lat: 23.0,
//             lng: 113.7,
//         },
//         name:'东莞',
//         mark:null,
//     },{
//         uluru:{
//             lat: 23.1,
//             lng: 114.4,
//         },
//         name:'惠州',
//         mark:null,
//     }
// ];
var positionArray=[];
(function() {
    $.ajax({
        type:'GET',
        url: 'js/Position.json',
        dataType:'json',
        success:function (res) {
            positionArray=res;
        },
        error: function (es) {
            console.log(es.status +' '+es.statusText);
        }
    });
})();
function initMap() {
    var center = {
        lat: 22.5,
        lng: 114.0,
    };
    map = new google.maps.Map(document.getElementById('map'),{
        center:center,
        zoom: 8,
        //disableDefaultUI: true,
        zoomControl:true,
        scaleControl: true
    });
    initMark(positionArray);
};
var initMark= function(pos) {

    pos.forEach(function (val) {
        var mark=new google.maps.Marker({
            position: val.uluru,
            map: map,
            styles:[{color: '#d59563'}]
        });
        mark.addListener('click',function () {
            var self=this;
            requestApi(val.uluru,self,map);
            markAnimation(self);
        });
        val.mark=mark;
        
    })
};
var markAnimation= function (mark) {
    mark.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        mark.setAnimation(null);
    },2000);
}
var clearMark=function () {
    positionArray.forEach(function (val) {
        val.mark.setMap(null);
    });
};
var findPos=function (name) {
    var res=[];
    if (name == '' || name == null){
        try{
            clearMark();
            initMark(positionArray);
        }catch (err){

        }
         res=positionArray;
    }else {
        positionArray.forEach(function (val) {
            if (val.name.indexOf(name) > -1){
                res.push(val)
            }
        });
        clearMark(positionArray);
        initMark(res);
    }
    return res;
}

var requestApi= function (uluru,mark,map) {
    var ClientID="GHJYXMP0MUTDFYV3HH44J25I3K2QOOB0R4ZDMYY3WD4A2A4F";
    var ClientSecret="TDPIY4JF2GBRKUVIJNRERF5VPI5FWCAZDHZL11ZKSR4OVH0H";
    var url="https://api.foursquare.com/v2/venues/search?&v=20180227&";
    var address="";
    var requestUrl=url +"ll="+uluru.lat+","+uluru.lng+""+'&client_id=' + ClientID + '&client_secret=' + ClientSecret;
    console.log(requestUrl);
    axios.get(requestUrl)
        .then(function (res) {
            console.log(res);
            address = res.data.response.venues[0].name;
            console.log(address);
            var infowindow = new google.maps.InfoWindow({
                content: address,
            });
            infowindow.open(map, mark);
            setTimeout(function () {
                infowindow.close();
            },3000)
        })
        .catch(function(err){
            alert(err);
        });
};
function mapErrorHandle() {
    alert("地图加载错误");
}