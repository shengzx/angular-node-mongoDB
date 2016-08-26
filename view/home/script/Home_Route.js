//路由控制
'use strict'
var app = angular.module('app');
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("home", {
            url: "/home",
            templateUrl: "/view/home/home.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('/view/home/script/Home_Controller.js');
                }
                ]
            },
            controller:"homeCtrl",
        })
    }]);