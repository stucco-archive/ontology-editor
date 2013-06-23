require.config({
    paths: {
        jquery:     '../bower_components/jquery/jquery',
        flight:     '../bower_components/flight/',
        bootstrap:  'vendor/bootstrap',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'bootstrap', 'vendor/yaml'], function (app, jquery, bootstrap, yaml) {
    'use strict';
    var doc = YAML.parse('greeting: hello\nname: world');
    console.log(doc);
    app.init();
});
