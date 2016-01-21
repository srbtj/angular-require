//ctrls.controller('PaginationController',['$scope',function($scope){
//
//    $scope.totalItems = 64;
//    $scope.maxSize = 5;
//    $scope.currentPage = 2;
//}]);

define(['./module'],function(ctrls){
    'use strict';
    ctrls.controller('PaginationController',['$scope',function($scope){

        $scope.totalItems = 64;
        $scope.maxSize = 5;
        $scope.currentPage = 2;
    }]);
});