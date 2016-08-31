'use strict'
var app = angular.module("app");

app.factory('msgService', ['$rootScope', '$modal', '$state', function ($rootScope, $modal, $state) {
    var msg = function () {
        this.open = function () {
            $modal.open({
                templateUrl: 'tpl/msgModel.html',
                resolve: discribe
            });
        }
        this.close = function () {
            $model.$model
        }
        this.ok = function () {
            console.log("点击了确定方法");
        }
        this.discribe;
        this.name = "提示框";
    }
    msg.prototype.msg_alert = function (param) {
        this.discribe = param;
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
    .factory('fileService', ['$rootScope', '$state', 'FileUploader', function ($rootScope, $state, FileUploader) {
        var file = function () {
            this.url = "localhost";
            this.data;
            this.name = "FileUpload"
        }
        file.prototype.redata = function (data) {
            this.data = data;
        }
        file.prototype.reurl = function (url) {
            this.url = url;
        }
        file.prototype.rename = function (name) {
            this.name = name;
        }
        file.prototype.instance = function (a) {
            var F = function (a) {
                this.name = a.name;
                this.url = a.url;
                this.data = a.data;
            };
            F.prototype = a.__proto__;
            F.prototype.FileUploader = new FileUploader({
                url: this.url
            });
            file.prototype.FileUpload = function () {
                this.FileUploader.uploadAll();
            };
            return new F(a);
        };
        return new file();
    }])
    .factory('pageService', ['$http', '$rootScope', '$modal', '$cookieStore', '$state', 'fileService', 'msgService', function ($http, $rootScope, $modal, $cookieStore, $state, fileService, msgService) {
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
                msgService[type](param);
            return msgService;
        }
        page.prototype.cookie = function (name, type, param) {
            return $cookieStore[type](name, param);
        }
        page.prototype.instanceFile = function (param, fun) {
            //可以通过抽样接口改变属性也可以重构方法
            this[fileService.name] = fileService.instance(fileService);
        }
        return new page();
    }])