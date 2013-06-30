require.config({
  paths: {
      jquery:     '../bower_components/jquery/jquery',
      flight:     '../bower_components/flight/',
      d3:         '../bower_components/d3/d3',
      d3chart:    'vendor/d3.chart',
      bootstrap:  'vendor/bootstrap'
    },
    shim: {
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      },
      d3chart: {
        deps: ['d3']
      }
    }
  });

require(['app'], function (app) {
  'use strict';
  app.init();
});
