/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis'
  ],

  function(text, vis) {
    'use strict';

    function init() {
      var w = 960 / 2 - 50
        , h = $(window).height() - 50;

      text.attachTo('#ontologyText', {width: w, height: h});
      vis.attachTo('#ontologyVis', {width: w, height: h});
    }

    return {
      init: init
    };

  }
);
