/*global define */
define(
  [
    'views/ontologyText',
    'views/ontologyVis'
  ],

  function(text, vis) {

    function init() {
      text.attachTo('#ontologyText');
      vis.attachTo('#ontologyVis');
    }
    return {
      init: init
    };

  }
);
