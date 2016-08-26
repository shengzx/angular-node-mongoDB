var app = angular.module('app');
angular.module('app').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state("about", {
            url: "/about",
            templateUrl: "/view/about/about.html",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('/view/about/script/About_Controller.js');
                }
                ]
            },
            controller:"aboutCtrl"
        })
    }]);