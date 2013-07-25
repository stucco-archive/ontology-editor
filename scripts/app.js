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

    function updateSize () {
      return {
        width: $(window).width() / 2 - 50
      , height: $(window).height() - 50
      };
    }

    function keyboard() {
      var shortcuts = {
        f:    [ { eventName:  'fullscreenToggle' } ],
        '/':  [ { eventName:  'search' } ],
        e:    [ { eventName:  'focusEditor' } ],
        u:    [ { eventName:  'undo' } ],
        r:    [ { eventName:  'redo' } ]
      };
      kb.attachTo(document, { shortcuts: shortcuts });
    }

    function events() {
      fullscreen.attachTo(document, {
        toggleEvents: ['fullscreenToggle'],
        target: 'body'
      });

      $(window).resize(function() {
        // TODO call text and vis to resize
        // var size = updateSize();
      });
    }

    function init() {
      var size  = updateSize()
        , attrs = { width: size.width, height: size.height };

      text.attachTo('#ontologyText', attrs);
      vis.attachTo('#ontologyVis', attrs);

      keyboard();
      events();
    }

    return {
      init: init
    };

  }
);
