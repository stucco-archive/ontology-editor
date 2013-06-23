require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        flight: '../bower_components/flight/',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap'], function (app, $) {
    'use strict';
    app.init();
});
