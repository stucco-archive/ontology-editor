/*global define, d3, jsyaml */
define(
  [
    'flight/lib/component',
    'jquery',
    'vendor/js-yaml.min',
    'd3',
    'd3chart'
  ],

  function(defineComponent)  {
    'use strict';

    function ontologyVis() {

      function initView(el) {
        d3.select(el).text('hiho');
      }

      function dumpYAML(evt, d) {
        var x = jsyaml.load(d.text);
        this.$node.text(JSON.stringify(x));
      }

      this.after('initialize', function() {
        initView(this.node);
        this.on('#ontologyText', 'textChange', dumpYAML);
      });

    }

    return defineComponent(ontologyVis);
  }
);
