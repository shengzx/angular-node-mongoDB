app.controller("mianmenuCtrl", ['$scope', 'website', function ($scope, website) {
    var params = {
        Type: "Get",
        Url: "/Angular/Json/bootmenu.json"
    };
    var params1 = {
        Type: "Get",
        Url: "/Angular/Json/route.json"
    };
    var dos = [{
        params: params,
        Name: "Dataload"
    }, {
            params: params1,
            Name: "GetRoute"
        }];
    var menucompent = new compent(website, dos, "menucompent");
    menucompent.Dataload(function (data) {
        $scope.model = data;
    });
    menucompent.GetRoute();
}]);
app.directive("mianmenu", ['website', function (website) {
    return {
        restrict: "E",
        template: function (e, a) {
            return '<div class="' + a.menuClass + ' sidebar-shortcuts" id="sidebar-shortcuts"><div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large"><h5>' + a.menuLable + '</h5></div><ul class="nav ' + a.menuClass + ' nav-list"><li class="hsub" ng-repeat="menu in model.Menu"><a ng-href="{{menu.Url?menu.Url:\'javascript:void(0)\'}}" class="dropdown-toggle"><i class="{{menu.icon}}"></i><span class="menu-text"> {{menu.MenuName}}</span><b class="arrow glyphicon glyphicon-menu-down"></b></a><b class="arrow"></b>'
                + '<ul class="submenu" ng-if="menu.Child">'
                + '<li class="" ng-repeat="list in menu.Child"><a href="{{list.Url}}"><i class="menu-icon fa fa-caret-right"></i>{{list.MenuName}}</a><b class="arrow"></b></li></ul>'
                + '</li></ul>';
        },
        replace: true,
        controller: "mianmenuCtrl",
        link: function ($scope, e, a) {
            e.on("click", "a", function () {
                if ($(this).parent().hasClass("hsub")) {
                    if ($(this).parent().hasClass("open")) {
                        $(this).parent().removeClass("open");
                        $(this).parent().children('ul').slideUp();
                    } else {
                        $("#sidebar li").children('ul').slideUp();
                        $("#sidebar li").removeClass("open");
                        $(this).parent().addClass("open");
                        var s = $(this).parent().children('ul').slideDown();
                    }
                } else {
                    $("#sidebar li").removeClass("active");
                    $(this).parent().addClass("active");
                    if ($(this).parent().parent().parent().hasClass("hsub")) {
                        $(this).parent().parent().parent().addClass("active");
                    }
                }
            });
        }
    };
}]);
