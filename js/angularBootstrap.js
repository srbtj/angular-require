define(['angular','require','app','router','angularAnimate',
    'angularMessages','angularUiRouter',
    'jQuery','bootstrap','controller/module','directive/module'],function(angular){
    'use strict';
    angular.element(document.getElementsByTagName('html')[0]).ready(function(){
        angular.bootstrap(document,['webApp']);
    });
});