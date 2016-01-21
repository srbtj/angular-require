define(['angular','angularUiRouter','controller/mainController','directive/mainDirective'],function(angular){
    'use strict';
    return angular.module('webApp',['ui.router','controllers','directives']);
});