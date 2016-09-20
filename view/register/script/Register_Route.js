'use strict'
var app = angular.module('app');
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state("register", {
            url: "/register",
            templateUrl: "/view/register/register.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '/view/register/script/Register_Controller.js',
                        '/view/register/script/Register_Service.js'
                    ]);
                }]
            },
            controller: "registerCtrl",
        })
    }
]);