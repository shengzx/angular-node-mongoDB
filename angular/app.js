'use strict'
var app = angular.module(
    'app',
    [
        'ngRoute',
        'ui.bootstrap',
        'ui.router',
        'oc.lazyLoad',
        'ngCookies',
        'angularFileUpload',
        'ngTouch'
    ]
);
app.run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);
app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }]);

