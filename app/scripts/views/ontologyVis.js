/*global define, d3 */
define(
  [
    'flight/lib/component',
    'jquery',
    'd3',
    'd3chart'
  ],

  function(defineComponent)  {
    'use strict';

    function ontologyVis() {
      var w    = 360
        , h    = 600
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

      function dumpJSON(evt, d) {
        var x = JSON.parse(d.text);
        updateVis(x);
      }

      function updateVis(d) {
        //  coerce to objects
        console.log(d);
        var nodes = d.properties.vertices.items;

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
          .text(function(d) { return d.id; });

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
        this.on('#ontologyText', 'textChange', dumpJSON);
      });

    }

    return defineComponent(ontologyVis);
  }
);
