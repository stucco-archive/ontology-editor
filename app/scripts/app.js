/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis',
    'flight/lib/component',
    'fullscreen',
    'kb'
  ],

  function(text, vis, defineComponent, fs, kb) {
    'use strict';

    kb.attachTo('#ontologyText', {
      shortcuts: {
        o: [
          {
            eventName: 'open'
          }
        ]
      }
    });

    // TODO trigger via keyboard shortcut instead of button
    fs.attachTo('#fs', {
      toggleEvents: ['click'], // Events that toggle fullscreen.
      target: 'body' // Specify different target.
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
