require.config({
  paths: {
      jquery:     '../bower_components/jquery/jquery.min',
      es5shim:    '../bower_components/es5-shim/es5-shim.min',
      es5sham:    '../bower_components/es5-shim/es5-sham.min',
      flight:     '../bower_components/flight/',
      fullscreen: '../bower_components/flight-fullscreen/lib/fullscreen',
      kb:         '../bower_components/flight-keyboard-shortcuts/lib/keyboard-shortcuts',
      d3:         '../bower_components/d3/d3.min',
      d3chart:    '../bower_components/d3.chart/d3.chart',
      underscore: '../bower_components/underscore/underscore-min'
      // bootstrap:  'vendor/bootstrap'
    },
    shim: {
      'flight/lib/component': {
        deps: ['jquery', 'es5shim', 'es5sham']
      },
      // bootstrap: {
      //   deps: ['jquery']
      // },
      d3: {
        exports: 'd3'
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
