//ctrls.controller('AnimationController',['$scope',function($scope){
//
//    $scope.data = [
//        { name : 'html'},
//        { name : 'javascript'},
//        { name : 'JAVA'},
//        { name : 'J2EE'},
//        { name : 'MySQL'}
//    ];
//
//    $scope.items = ['settings', 'home', 'other'];
//    $scope.selection = $scope.items[0];
//
//
//    $scope.count = 1;
//
//    $scope.addData = function(){
//
//        $scope.count++;
//        var obj = { name : 'tom' + $scope.count }
//        $scope.data.push(obj);
//    }
//
//    $scope.removeData = function(){
//
//        $scope.data.pop();
//    }
//}]);

define(['./module'],function(ctrls){
    'use strict';
    ctrls.controller('AnimationController',['$scope',function($scope){
        $scope.data = [
            { name : 'html'},
            { name : 'javascript'},
            { name : 'JAVA'},
            { name : 'J2EE'},
            { name : 'MySQL'}
        ];

        $scope.items = ['settings', 'home', 'other'];
        $scope.selection = $scope.items[0];


        $scope.count = 1;

        $scope.addData = function(){

            $scope.count++;
            var obj = { name : 'tom' + $scope.count }
            $scope.data.push(obj);
        }

        $scope.removeData = function(){

            $scope.data.pop();
        }
    }]);
});