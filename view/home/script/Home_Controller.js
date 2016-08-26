//负责数据绑定

// var  indexCtrl = function($scope){
//     $scope.label="fuck";
// }
var app = angular.module('app');
app.controller('homeCtrl',['$scope','pageService',function($scope,pageService){
 $scope.msg = pageService.msg("homepage alert", "msg_alert");
 $scope.msg.open();
 $scope.label="fuck";
}]);
