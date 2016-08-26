'use strict'
var app = angular.module("app");

app.factory('msgSercvie', ['$rootScope', '$modal', '$state', function ($rootScope, $modal, $state) {
    var msg = function (param) {
        this.open = function () {
            $modal.open({
                templateUrl: 'tpl/msgModel.html',
                controller: function () {
                },
                resolve: param
            });
        }
        this.close = function () {
            $model.$model
        }
        this.ok = function () {
            console.log("点击了确定方法");
        }
        this.discribe = param;
        this.name = "提示框";
    }
    msg.prototype.msg_alert = function () {

    }
    msg.prototype.confirm = function (ok_fun, cancel_fun) {
        this.name = "选择提示框";
        if (ok_fun);
        this.ok = function () {
            this.close();
            ok_fun();
        }
        if (cancel_fun);
        this.cancel = function () {
            this.close();
            cancel_fun();
        }
    }
    return new msg();
}])
    .factory('pageService', ['$http', '$rootScope', '$modal', '$state', 'msgSercvie', function ($http, $rootScope, $modal, $state, msgSercvie) {
        var page = function () {
        };
        page.prototype.ajax = function (param) {
            $http({
                param
            }).success(function (data, header, config, status) {
                //响应成功

            }).error(function (data, header, config, status) {
                //处理响应失败
            });
        }
        page.prototype.msg = function (param, type) {
            if (type !== undefined)
                msgSercvie[type]();
            return msgSercvie;
        }
        return new page();
    }])