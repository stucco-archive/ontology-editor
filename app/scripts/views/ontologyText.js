/*global define */
define(
  [
    'flight/lib/component',
    'jquery'
  ],

  function(defineComponent)  {
    'use strict';

    function ontologyText() {

      function initView(el) {
        $('<textarea>')
          .attr('id', 'ontologyTextArea')
          .width(620)
          .height(600)
          .appendTo(el);
      }

      function textChange() {
        var d = { text: this.$node.find('textarea').val() };
        this.trigger('textChange', d);
      }

      this.after('initialize', function() {
        initView(this.$node);
        this.on('input propertychange', textChange);
      });

    }

    return defineComponent(ontologyText);
  }
);
