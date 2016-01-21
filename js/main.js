require.config({
    baseUrl : './js',
    paths : {
        'angular' : 'common/angular',
        'angularAnimate' : 'common/angular-animate',
        'angularMessages' : 'common/angular-messages',
        'angularUiRouter' : 'common/angular-ui-router',
        'bootstrap' : 'common/bootstrap',
        'jQuery' : 'common/jquery-1.11.3'
    },
    shim : {
        'jQuery' : { exports : 'jQuery'},
        'angular' : { exports : 'angular'},
        'angularAnimate' : {
            deps : ['angular']
        },
        'angularMessages' : {
            deps : ['angular']
        },
        'angularUiRouter' : {
            deps : ['angular']
        },
        'bootstrap' : {
            deps : ['jQuery']
        }
    },
    deps : ['./angularBootstrap']
});