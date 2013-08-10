/* global define */
define(
  [
    'flight/lib/component',
    'jquery'
  ],

  function(defineComponent)  {
    'use strict';

    function text() {
      var textarea;

      function init(el, attr) {
        textarea = $('<textarea>')
          .attr('id', 'text')
            .width(attr.width)
            .height(attr.height - 10)
            .text('Paste graph schema here.')
          .appendTo(el)
            .select()
            .focus();
      }

      function textChange() {
        var d = { text: textarea.val() };
        this.trigger('textChange', d);
      }

      this.after('initialize', function() {
        init(this.$node, this.attr);
        this.on('focusout blur', textChange);
      });

    }

    return defineComponent(text);
  }
);
