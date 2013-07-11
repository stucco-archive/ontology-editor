require.config({
  paths: {
      jquery:     '../bower_components/jquery/jquery',
      flight:     '../bower_components/flight/',
      d3:         '../bower_components/d3/d3',
      d3chart:    '../bower_components/d3.chart/d3.chart',
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

require(['app', 'jquery'], function (app, $) {
  'use strict';

  $().ready(function () {
    app.init();
  });

});
