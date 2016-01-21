define([],function(){

    var accordions = angular.module('accordionModule',['collapseModule']);

    accordions.constant('AccordionConfig',{
        closeOthers : true
    });

    accordions.controller('MyAccordinationController',['$scope','$attrs','$parse','AccordionConfig',function($scope,$attrs,$parse,AccordionConfig){

        this.groups = [];

        this.closeOthers = function(newGroup){

            var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : AccordionConfig.closeOthers;

            if(closeOthers){

                angular.forEach(this.groups,function(group){

                    if(group !== newGroup){

                        group.isOpen = false;
                    }
                });
            }
        };

        this.addGroup = function(group){

            this.groups.push(group);

            var that = this;
            group.$watch('$destroy',function($event){

                that.removeGroup(group);
            })
        };

        this.removeGroup = function(group){

            var index = this.groups.indexOf(group);

            if(group !== -1){

                this.groups.splice(index,1);
            }
        }
    }]);


    accordions.directive('myAccordion',function($parse){

        return {
            restrict : 'E',
            replace : true,
            transclude : true,
            controller : 'MyAccordinationController',
            controllerAs : 'accordion',
            templateUrl : './html/myAccordion.html'
        }
    });

    accordions.directive('myAccordionGroup',function(){

        return {

            restrict : 'E',
            replace : true,
            transclude : true,
            templateUrl : './html/myAccordionGroup.html',
            require : '^?myAccordion',
            scope : {
                heading : '@',
                isDisabled : '=?',
                isOpen : '=?'
            },
            link : function(scope,elements,attrs,controller){

                controller.groups.push(scope);

                scope.panelClass = attrs.panelClass || 'panel-panelClass';
                scope.panelOpen = attrs.panelOpen || 'panel-open';

                scope.toggleOpen = function($event){

                    if(!scope.isDisabled){
                        if(!$event || scope.which === 32){
                            scope.isOpen = !scope.isOpen;
                        }
                    }
                };

                scope.$watch('isOpen',function(val){

                    elements.toggleClass(scope.panelOpen,!!val);
                    if(val){
                        controller.closeOthers(scope);
                    }
                });

                scope.deleteItem = function(){
                    controller.removeGroup(scope);
                }
            }
        }
    });




    //var accordions = angular.module('accordionModule',['collapseModule']);
    //
    //accordions.constant('AccordionConfig',{
    //    closeOther : true
    //});
    //accordions.controller('MyAccordionController',['$scope','$attrs','AccordionConfig',function($scope,$attrs,AccordionConfig){
    //    /** accordion groups */
    //    this.groups = [];
    //    this.closeOthers = function(openGroup){
    //        /** whether close other accordion **/
    //        var closeOthers = angular.isDefined($attrs.closeOthers) ?
    //            $scope.$eval($attrs.closeOthers) : AccordionConfig.closeOther;
    //
    //        if(closeOthers){
    //            angular.forEach(this.groups,function(group){
    //                //var that = this;
    //                if(group !== openGroup){
    //                    group.isOpen = false;
    //                }
    //            });
    //        }
    //    };
    //
    //    this.addGroup = function(group){
    //
    //        this.groups.push(group);
    //
    //        var that = this;
    //
    //        group.$on('$destroy',function($event){
    //
    //            that.removeGroup(group);
    //        });
    //    };
    //
    //    this.removeGroup = function(group){
    //
    //        var index = this.groups.indexOf(group);
    //        if(index !== -1){
    //
    //            this.groups.splice(index,1);
    //        }
    //    }
    //
    //}]);
    //
    //accordions.directive('myAccordion',function(){
    //
    //    return {
    //        replace : true,
    //        restrict : 'E',
    //        transclude : true,
    //        controller : 'MyAccordionController',
    //        controllerAs : 'accordionCtrl',
    //        templateUrl : './html/myAccordion.html'
    //    }
    //})
    //    .directive('myAccordionGroup',function(){
    //
    //        return {
    //            restrict : 'E',
    //            replace : true,
    //            transclude : true,
    //            require : '^?myAccordion',
    //            templateUrl : './html/myAccordionGroup.html',
    //            scope : {
    //                heading : '@',
    //                isOpen : '=?',
    //                isDisabled : '=?'
    //            },
    //            link : function(scope,elements,attrs,accordionCtrl){
    //
    //                accordionCtrl.addGroup(scope);
    //                scope.openClass = attrs.openClass || 'panel-open';
    //                scope.panelClass = attrs.panelClass || 'panel-default';
    //
    //                scope.$watch('isOpen',function(value){
    //
    //                    elements.toggleClass(scope.openClass,!!value)
    //                    if(value){
    //                        /** close other accordion **/
    //                        accordionCtrl.closeOther(scope);
    //                    }
    //                });
    //                scope.toggleOpen = function($event){
    //                    if(!scope.isDisabled){
    //                        if(!$event || $event.which === 32){
    //                            scope.isOpen = !scope.isOpen;
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    });

});