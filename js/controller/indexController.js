//
//ctrls.controller('IndexController',['$scope','$location',function($scope,$location){
//
//
//    $scope.routeMap = {
//
//        index:/^\/$/,  /** 首页 **/
//        student:/\/student.*/,
//        course:/\/course.*/,
//        about:/\/about.*/,
//        work:/\/work.*/,
//        team:/\/team.*/,
//        message:/\/message.*/  /** 留言**/
//    };
//    $scope.isActive = function(regExp){
//        var cur_url = $location.url();
//        return regExp.test(cur_url);
//    }
//
//}]);

define(['./module'],function(ctrls){
    'use strict';
    ctrls.controller('IndexController',['$scope',function($scope){}]);
});

