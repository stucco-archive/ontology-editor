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
      var w    = 660
        , h    = 500
        , vis;

      var force = d3.layout.force()
        .size([w, h]);

      function initView(el) {
        vis = d3.select(el).append('svg')
          .attr('width', w)
          .attr('height', h);

        vis.append('rect')
          .attr('width', w)
          .attr('height', h)
          .attr('stroke', 'black')
          .attr('fill', 'none');
      }

      function dumpYAML(evt, d) {
        var x = jsyaml.load(d.text);
        updateVis(x);
      }

      function updateVis(d) {
        //  coerce to objects
        var nodes = Object.keys(d).map(function (d) {
          return {name: d};
        });

        force.stop();

        var node = vis.selectAll('.node')
          .data(nodes)
          .enter().append('circle')
          .attr('class', 'node')
          .attr('r', 5)
          .attr('cx', 50)
          .attr('cy', 50)
          .style('fill', 'steelblue')
          .call(force.drag);

        node.append('title')
          .text(function(d) { return d.name; });

        force.on('tick', function() {
          vis.selectAll('.node')
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        });

        force.nodes(nodes)
          .start();
      }

      this.after('initialize', function() {
        initView(this.node);
        this.on('#ontologyText', 'textChange', dumpYAML);
      });

    }

    return defineComponent(ontologyVis);
  }
);
