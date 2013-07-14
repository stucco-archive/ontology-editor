/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis',
    'mousetrap',
  ],

  function(text, vis) {
    'use strict';

    Mousetrap.bind('ctrl+shift+b', function(e, combo) {
      console.log(combo); // logs 'ctrl+shift+up'
    });

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
