require.config({
  paths: {
      jquery:     '../bower_components/jquery/jquery',
      es5shim:    '../bower_components/es5-shim/es5-shim',
      flight:     '../bower_components/flight/',
      fullscreen: '../bower_components/flight-fullscreen/lib/fullscreen',
      d3:         '../bower_components/d3/d3',
      d3chart:    '../bower_components/d3.chart/d3.chart',
      bootstrap:  'vendor/bootstrap'
    },
    shim: {
      'flight/lib/component': {
        deps: ['jquery']
      },
      bootstrap: {
        deps: ['jquery']
      },
      d3chart: {
        deps: ['d3']
      }
    }
  });

require(['app', 'jquery', 'flight/lib/component', 'fullscreen'], function (app, $, defineComponent, fs) {
  'use strict';

  // TODO trigger via keyboard shortcut instead of button
  fs.attachTo('#fs', {
    toggleEvents: ['click'], // Events that toggle fullscreen.
    target: 'body' // Specify different target.
  });

  $().ready(function () {
    app.init();
  });

});
