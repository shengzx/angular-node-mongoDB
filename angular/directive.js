'use strict'
var app = angular.module('app');
app.directive("tNav", [function() {
    return {
        restrict: "A",
        template: function(e, a) {
            return '<div class="y-l-t">' +
                '<div class="logo">' +
                '<span class="y-logo y-logo-sm">痒</span>' +
                '</div>' +
                '<div class="y-l-w">' +
                '<span>欢迎痒痒的小伙伴～</span>' +
                '</div>' +
                '<div class="y-l-t-uidiv">' +
                '<div>' +
                '<ul>' +
                '<li><a href="#" class="btn">痒痒漫画</a></li>' +
                '<li><a ui-sref="register" class="btn">成为会员</a></li>' +
                '<li><a href="#" class="btn">会员登录</a></li>' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '</div>';
        },
        replace: true
    }
}]);