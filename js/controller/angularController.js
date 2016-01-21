//ctrls.controller('AngularController',['$scope',function($scope){
//
//    $scope.input = {
//        value1 : true,
//        value2 : 'YES',
//        date : new Date(2015,12,21)
//    };
//}]);

define(['./module'],function(ctrls){
    'use strict';
    ctrls.controller('AngularController',['$scope',function($scope){
        $scope.input = {
            value1 : true,
            value2 : 'YES',
            date : new Date(2015,12,21)
        };
    }]);
});