/*global define */
define(
  [
    'flight/lib/component',
    'views/text',
    'views/vis',
    'models/network',
    'load',
    'fullscreen',
    'kb'
  ],

  function(defineComponent, text, vis, network, loadData, fullscreen, kb) {
    'use strict';

    function updateSize () {
      return {
        width: $(window).width() / 2 - 50
      , height: $(window).height() - 100
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

      network.attachTo(document);
      text.attachTo('#text', attrs);
      vis.attachTo('#vis', attrs);

      keyboard();
      events();

      // load the data
      loadData.attachTo(document, {file: '../ontology/stucco_schema.json'});
    }

    return {
      init: init
    };

  }
);
