/*global define */
define(
  [
    'flight/lib/component',
    'jquery'
  ],

  function(defineComponent)  {
    'use strict';

    function ontologyText() {

      function initView(el, attrs) {

        var w = attrs.width
          , h = attrs.height;

        $('<textarea>')
          .attr('id', 'ontologyTextArea')
          .width(w)
          .height(h - 10)  // account for scrollbar size?
          .text('Paste graph schema here.')
          .appendTo(el)
          .select()
          .focus();
      }

      function textChange() {
        var d = { text: this.$node.find('textarea').val() };
        this.trigger('textChange', d);
      }

      this.after('initialize', function() {
        initView(this.$node, this.attr);
        this.on('input propertychange', textChange);
      });

    }

    return defineComponent(ontologyText);
  }
);
