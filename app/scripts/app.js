/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis',
    'flight/lib/component',
    'fullscreen',
    'kb'
  ],

  function(text, vis, defineComponent, fullscreen, kb) {
    'use strict';

    kb.attachTo(document, {
      shortcuts: {
        f:    [ { eventName:  'fullscreenToggle' } ],
        '/':  [ { eventName:  'search' } ],
        e:    [ { eventName:  'focusEditor' } ],
        u:    [ { eventName:  'undo' } ],
        r:    [ { eventName:  'redo' } ]
      }
    });

    fullscreen.attachTo(document, {
      toggleEvents: ['fullscreenToggle'],
      target: 'body'
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
