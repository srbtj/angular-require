define([],function(){

    var directives = angular.module('collapseModule',[]);

    directives.directive('myCollapse',['$animate',function($animate){

        return {

            link : function(scope,elements,attrs){

                /** set default css **/
                if(!scope.$eval(attrs.myCollapse)){
                    elements.addClass('collapse')
                        .addClass('in')
                        .css({ height : 'auto'});
                }

                scope.$watch(attrs.myCollapse,function(vals){
                    /**
                     *  true : open
                     *  false : hide
                     *  class : collpase --> hide  collapsing --> transition  in --> show
                     * **/
                    if(vals){
                        show();
                    }else{
                        hide();
                    }
                });

                /** show collapse content */
                function show(){
                    elements.removeClass('collapse')
                        .addClass('collapsing')
                        .css({ height : '0'});

                    $animate.addClass(elements,'in',{
                        to : { height : elements[0].scrollHeight + 'px'}
                    }).then(showDone);
                }

                function showDone(){
                    elements.removeClass('collapsing')
                        .addClass('collapse')
                        .css({ height : 'auto' });
                }

                /** hide collapse content **/
                function hide(){
                    elements.css({ height : elements[0].scrollHeight + 'px'})
                        .removeClass('collapse')
                        .addClass('collapsing');

                    $animate.removeClass(elements,'in',{
                        to : { height : '0px'}
                    }).then(hideDone);

                }

                function hideDone(){
                    elements.removeClass('collapsing')
                        .addClass('collapse')
                        .css({ height : '0px'});
                }
            }
        }
    }]);
});