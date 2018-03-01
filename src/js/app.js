//导航栏动画

var mapModel = function () {
    self= this;
    //self.classNameNav='nav-list show';
    self.classNameNav=ko.observable('nav-list show');
    self.classNameMap=ko.observable('map-content show');
    self.slectPos=ko.observable('');
    //self.pos = ko.observableArray(positionArray);
    self.pos = ko.computed(function () {
        var res=findPos(self.slectPos());
        return res;
    });
    self.hideNav= function () {
        console.log("yin");
        self.classNameMap('map-content hide');
        self.classNameNav('nav-list hide');
    };
    self.showNav= function () {
        console.log("xian");
        self.classNameMap('map-content show');
        self.classNameNav('nav-list show');

    };
    self.clickMark=function (val) {
        markAnimation(val.mark);
    };
};
ko.applyBindings(new mapModel());


