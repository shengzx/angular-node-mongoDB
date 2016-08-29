'use strict'
var app = angular.module("app");

app.factory('msgSercvie', ['$rootScope', '$modal', '$state', function ($rootScope, $modal, $state) {
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
    // .factory('fileSercvie', ['$rootScope', '$state', function ($rootScope,$state) {
    //     var file = function(){
    //         this.FileUpload = function(){
    //             ngFileUpload.upload(
    //                 {
    //                     url:url,
    //                     data:data
    //                 }
    //             );
    //         };
    //         this.url = "localhost";
    //         this.data;
    //         this.name = "FileUpload"
    //     }
    //     file.prototype.redata = function(data){
    //          this.data =data;
    //     }
    //     file.prototype.reurl = function(url){
    //         this.url = url;
    //     }
    //     file.prototype.rename = function(name){
    //         this.name = name;
    //     }
    // }])
    .factory('pageService', ['$http', '$rootScope', '$modal', '$cookieStore', '$state', 'msgSercvie', function ($http, $rootScope, $modal, $cookieStore,$state, msgSercvie) {
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
                msgSercvie[type](param);
            return msgSercvie;
        }
        page.prototype.cookie = function (name, type, param) {
            return $cookieStore[type](name, param);
        }
        page.prototype.intiFile = function(){
            //  return fileSercvie;
        }
        page.prototype.instanceFile=function(){
            this[fileSercvie.name] = fileSercvie;
        }
        return new page();
    }])