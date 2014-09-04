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

      this.initData = function (event, data) {
        var t = JSON.stringify(data.graph, undefined, 2);
        textarea.val(t);
        this.textChange();
      };

      this.textChange = function () {
        var d = { text: textarea.val() };
        this.trigger('textChange', d);
      };

      this.after('initialize', function() {
        init(this.$node, this.attr);

        this.on(document, 'data.init', this.initData);
        this.on('focusout blur', this.textChange);
      });

    }

    return defineComponent(text);
  }
);
