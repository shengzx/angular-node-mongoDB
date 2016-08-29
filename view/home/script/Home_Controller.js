//负责数据绑定

// var  indexCtrl = function($scope){
//     $scope.label="fuck";
// }
var app = angular.module('app');
app.controller('homeCtrl',['$scope','pageService',function($scope,pageService){
 $scope.event = pageService;
 $scope.event.msg = pageService.msg("homepage alert", "msg_alert");
 $scope.event.getcookie = function(){
       $scope.event.cookie("userinfo","get");
 }
//  $scope.event.intiFile().rename("filename");
//  $scope.event.instanceFile();
//  $scope.event.filename.FileUpload();
 $scope.label="fuck";
}]);
