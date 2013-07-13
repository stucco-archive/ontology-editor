require.config({
  paths: {
      jquery:     '../bower_components/jquery/jquery',
      flight:     '../bower_components/flight/',
      component:  '../bower_components/flight/lib/component',
      es5shim:    '../bower_components/es5-shim/es5-shim', 
      es5sham:    '../bower_components/es5-shim/es5-sham',
      kb:         '../bower_components/flight-keyboard-shortcuts/lib/keyboard-shortcuts',
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
      },
      flight: {
        deps: [
        ]
      },
      kb: {
        deps: [
          'jquery',
          'flight/lib/component',
          'es5shim', 
          'es5sham'
        ]
      }
    }
  });

require(['app', 'jquery'], function (app, $) {
  'use strict';

  $().ready(function () {
    app.init();
  });

});
