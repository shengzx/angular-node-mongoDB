//路由控制
'use strict'
var app = angular.module('app');
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("content", {
            url: "/content",
            templateUrl: "/view/content/content.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('/view/content/script/Content_Controller.js');
                }
                ]
            },
            controller:"contentCtrl",
        })
    }]);