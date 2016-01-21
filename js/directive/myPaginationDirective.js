
define([],function(){

    var paginations = angular.module('paginationModule',['pagingModule']);

    paginations.constant('PaginationConfig',{
        itemsPerPage: 5, /** 每页显示的列数 **/
        boundaryLinks: true,
        boundaryLinkNumbers: true,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        rotate: true,
        forceEllipses: true
    });

    paginations.controller('MyPaginationController',['$parse','$scope','$attrs','PaginationConfig','Paging',
        function($parse,$scope,$attrs,PaginationConfig,Paging){

            var ctrl = this;

            var maxSize = angular.isDefined($attrs.maxSize) ? $scope.$parent.$eval($attrs.maxSize) : PaginationConfig.maxSize,
                rotate = angular.isDefined($attrs.rotate) ? $scope.$parent.$eval($attrs.rotate) : PaginationConfig.rotate,
                boundaryLinkNumbers = angular.isDefined($attrs.boundaryLinkNumbers) ? $scope.$parent.$eval($attrs.boundaryLinkNumbers) : PaginationConfig.boundaryLinkNumbers,
                forceEllipses = angular.isDefined($attrs.forceEllipses) ? $scope.$parent.$eval($attrs.forceEllipses) : PaginationConfig.forceEllipses;

            $scope.boundaryLinks = angular.isDefined($attrs.boundaryLinks) ? $scope.$parent.$eval($attrs.boundaryLinks) : PaginationConfig.boundaryLinks;
            $scope.directionLinks = angular.isDefined($attrs.directionLinks) ? $scope.$parent.$eval($attrs.directionLinks) : PaginationConfig.directionLinks;

            Paging.create(this,$scope,$attrs);

            var originRender = this.render;

            if($attrs.maxSize){
                $scope.$parent.$watch($parse($attrs.maxSize),function(val){

                    maxSize = parseInt(val,10);
                    ctrl.render();
                })
            }

            this.render = function(){

                originRender();

                if($scope.page > 0 && $scope.page <= $scope.totalPages){

                    $scope.pages = getPage($scope.page,$scope.totalPages);
                }
            }

            function getPage(currentPage,totalPage){

                var pages = [];
                var startPage = 1,endPage = totalPage;

                var isMaxSize = angular.isDefined(maxSize) & maxSize <= $scope.totalPages;
                /** 设置当前页居中 **/
                if(rotate){

                    startPage = Math.max( currentPage - Math.floor(maxSize / 2),1);
                    endPage = startPage + maxSize - 1;

                    if(endPage > totalPage){

                        endPage = totalPage;
                        startPage = endPage - maxSize + 1 < 0 ? 1 : endPage - maxSize + 1;
                    }
                }else{
                    startPage = ( Math.ceil(currentPage/maxSize) - 1 ) * maxSize + 1;
                    endPage = Math.min( startPage + maxSize - 1,totalPage );
                }

                for(var number = startPage; number <= endPage;number++){

                    var page = makePage(number,number,number === currentPage);
                    pages.push(page);
                }

                /** links **/
                if(isMaxSize && maxSize > 0 && (!rotate || forceEllipses || boundaryLinkNumbers)){

                    if(startPage > 1){

                        if(!boundaryLinkNumbers || startPage > 3){

                            var previousPage = makePage(startPage - 1 ,'...',false);
                            pages.unshift(previousPage);
                        }

                        if(boundaryLinkNumbers){

                            if(startPage === 3){

                                var previousPage = makePage(2,'2',false);
                                pages.unshift(previousPage);
                            }

                            var firstPage = makePage(1,'1',false);
                            pages.unshift(firstPage);
                        }
                    }

                    if(endPage < $scope.totalPages){

                        if(!boundaryLinkNumbers || endPage < $scope.totalPages - 2){

                            var nextToPages = makePage(endPage+1,'...',false);
                            pages.push(nextToPages);
                        }

                        if(boundaryLinkNumbers){

                            if(endPage === $scope.totalPages - 2){

                                var nextToPages = makePage($scope.totalPages -1,$scope.totalPages -1 ,false)
                                pages.push(nextToPages);
                            }

                            var lastPages = makePage($scope.totalPages,$scope.totalPages,false);
                            pages.push(lastPages);
                        }
                    }
                }

                return pages;
            }

            function makePage(number,text,isActive){
                return {
                    number : number,
                    text : text,
                    active : isActive
                }
            }

        }]);

    paginations.directive('myPagination',['PaginationConfig',function(PaginationConfig){

        return {
            restrict : 'E',
            replace : true,
            require : ['myPagination','?ngModel'],
            controller : 'MyPaginationController',
            controllerAs : 'pagination',
            templateUrl : './html/myPagination.html',
            scope : {
                totalItems : '=',
                isDisable : '=',
                previousText : '@?',
                firstText : '@?',
                nextText : '@?',
                lastText : '@?',
                itemsPerPage : '=?',
                maxSize : '=?'
            },
            link : function(scope,elements,attrs,ctrl){

                var paginationCtrl = ctrl[0],ngModelCtrl = ctrl[1];

                if(!ngModelCtrl)  return;

                paginationCtrl.init(ngModelCtrl,PaginationConfig);
            }
        }
    }]);
});