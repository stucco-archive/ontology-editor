/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis'
  ],

  function(text, vis) {
    'use strict';

    function updateSize () {
      return {
        width: $(window).width() / 2 - 50
      , height: $(window).height() - 50
      };
    }

    function init() {
      var size = updateSize();

      $(window).resize(function() {
        size = updateSize();
        // TODO - call text and vis to resize
      });

      text.attachTo('#ontologyText', {width: size.width, height: size.height});
      vis.attachTo('#ontologyVis', {width: size.width, height: size.height});
    }

    return {
      init: init
    };

  }
);
