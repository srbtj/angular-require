
define([],function(){

    var paging = angular.module('pagingModule',[]);

    paging.factory('Paging',['$parse',function($parse){

        return {

            create: function(ctrl, $scope, $attrs) {

                ctrl.ngModelCtrl = { $setViewValue : angular.noop};

                ctrl.init = function(ngModelCtrl,config){

                    ctrl.ngModelCtrl = ngModelCtrl;
                    ctrl.config = config;

                    ngModelCtrl.$render = function(){

                        ctrl.render();
                    }

                    if($attrs.itemsPerPage){

                        $scope.$parent.$watch($parse($attrs.itemsPerPage),function(val){

                            ctrl.itemsPerPage = parseInt(val,10);
                            $scope.totalPages = ctrl.calculateTotalPages();
                            ctrl.updatePage();
                        });
                    }else{

                        ctrl.itemsPerPage = config.itemsPerPage;
                    }

                    $scope.$watch('totalItems',function(newTotal,oldTotal){

                        if(angular.isDefined(newTotal) || newTotal !== oldTotal){

                            $scope.totalPages = ctrl.calculateTotalPages();
                            ctrl.updatePage();

                        }
                    })
                }

                ctrl.render = function(){

                    $scope.page = parseInt(ctrl.ngModelCtrl.$viewValue,10);
                }

                ctrl.calculateTotalPages = function(){

                    var totalPage = ctrl.itemsPerPage < 0 ? 1 : Math.ceil($scope.totalItems / ctrl.itemsPerPage);
                    return Math.max(totalPage || 0 ,1);
                }

                ctrl.updatePage = function(){

                    if($scope.page > $scope.totalPages){

                        $scope.selectPage($scope.totalPages);
                    }else{

                        ctrl.ngModelCtrl.$render();
                    }
                }

                $scope.selectPage = function(currentPage,event){

                    if(event){ event.preventDefault();}

                    var allowClick = !$scope.ngDisabled || !event;

                    if(allowClick && currentPage > 0 && currentPage !== $scope.page && currentPage <= $scope.totalPages){

                        if(event.target){

                            event.target.blur();
                        }

                        ctrl.ngModelCtrl.$setViewValue(currentPage);
                        ctrl.ngModelCtrl.$render();

                    }

                }

                $scope.noPrevious = function(){

                    return $scope.page === 1;
                }

                $scope.noNext = function(){

                    return $scope.page === $scope.totalPages;
                }

                $scope.getText = function(key){

                    return $scope[key+'Text'] || ctrl.config[key+'Text'];
                }
            }
        }
    }]);

    return paging;
});