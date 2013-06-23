/*global define */
define(
  [
    'jquery',
    'flight/lib/component'
  ],

  function($, defineComponent)  {
    'use strict';
    return defineComponent(ontologyText);

    function ontologyText() {

      function initView(el) {
        $('<textarea>')
          .attr('rows', 16)
          .attr('cols', 80)
          .appendTo(el);
      }

      function sayHi() {
        console.log('hi');
      }

      this.after('initialize', function() {
        initView(this.$node);
        this.on('input propertychange', sayHi);
      });

    }
  }
);
