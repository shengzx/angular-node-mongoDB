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
    }])
    .directive("formControl", function() {
        return {
            restrict: "E",
            template: function(e, a) {
                return '<div class="form-group">' +
                    '<label class="col-sm-4">' + a.label + '</label>' +
                    '<div class="col-sm-5">' +
                    '<input type="' + a.type + '" class="form-control "  placeholder="' + a.placeholder + '">' +
                    '</div>' +
                    '</div>';
            },
            link: function(s, e, a) {
                //获取当前input对象
                var curint = e[0].children[0].children[1].children[0];
                var curdiv = e[0].children[0];
                //valuechange 事件验证表单
                curint.oninput = function(cur) {
                    var isvalid = this.checkValidity();
                    if (isvalid) {
                        curdiv.className = "form-group has-success";
                        return;
                    }
                    curdiv.className = "form-group has-error";
                }
            }
        }

    })