/*global define */
define(
  [
    'jquery',
    'flight/lib/component'
  ],

  function($, defineComponent)  {
    'use strict';
    return defineComponent(ontologyVis);

    function ontologyVis() {

      function initView(el) {
        $('<div>')
          .text('hi')
          .appendTo(el);
      }

      function sayHo(d) {
        console.log(d);
      }

      this.after('initialize', function() {
        initView(this.$node);
        this.on('#ontologyText', 'input propertychange', sayHo);
      });

    }
  }
);
