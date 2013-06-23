/*global define */
define(
  [
    'flight/lib/component',
    'vendor/js-yaml.min'
  ],

  function(defineComponent)  {
    'use strict';
    return defineComponent(ontologyVis);

    function ontologyVis() {

      function initView(el) {
        $('<div>')
          .text('hi')
          .appendTo(el);
      }

      function dumpYAML(evt, d) {
        var x = jsyaml.load(d.text);
        this.$node.text(JSON.stringify(x));
      }

      this.after('initialize', function() {
        initView(this.$node);
        this.on('#ontologyText', 'textChange', dumpYAML);
      });

    }
  }
);
