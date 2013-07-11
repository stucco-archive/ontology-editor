/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis'
  ],

  function(text, vis) {
    'use strict';

    function init() {
      var w = $(window).width()
        , paneWidth = w / 2 - 50
        , h = $(window).height()
        , paneHeight = h - 50;

      text.attachTo('#ontologyText', {width: paneWidth, height: paneHeight});
      vis.attachTo('#ontologyVis', {width: paneWidth, height: paneHeight});
    }

    return {
      init: init
    };

  }
);
