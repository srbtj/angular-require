//ctrls.controller('CollapseController',['$scope',function($scope){
//
//    $scope.isOpen = false;
//    $scope.isClose = true;
//}]);

define(['./module'],function(ctrls){
    'use strict';
    ctrls.controller('CollapseController',['$scope',function($scope){

        $scope.isOpen = false;
        $scope.isClose = true;
    }])
});