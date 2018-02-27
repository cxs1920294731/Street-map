//导航栏动画

var mapModel = function () {
    self= this;
    self.classNameNav='nav-list show';
    self.classNameMap='map-content show';
    self.slectPos=ko.observable('');
    //self.pos = ko.observableArray(positionArray);
    self.pos = ko.computed(function () {
        var res=findPos(self.slectPos());
        return res;
    });
    self.hideNav= function () {
        self.classNameNav= 'nav-list hide';
        self.classNameMap='map-content hide' ;
    };
    self.showNav= function () {
        self.classNameMap='map-content show';
        self.classNameNav='nav-list show';
    };
    self.clickMark=function (val) {
        markAnimation(val.mark);
    };
};
ko.applyBindings(new mapModel());


