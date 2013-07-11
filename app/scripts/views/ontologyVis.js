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
        d.edges.map(function (d) {
          d.source = parseInt(d._inV);
          d.target = parseInt(d._outV);
        });

        force.stop();

        var link = vis.selectAll('.link')
          .data(d.edges)
          .enter().append('line')
          .attr('class', 'link')
          .style('stroke-width', 1)
          .style('stroke', 'black');

        var node = vis.selectAll('.node')
          .data(d.vertices)
          .enter().append('circle')
          .attr('class', 'node')
          .attr('r', 5)
          .style('fill', 'steelblue')
          .call(force.drag);

        node.append('title')
            .text(function(d) { return d._id; });

        force.on('tick', function() {
          vis.selectAll('.link')
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

          vis.selectAll('.node')
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        });

        force
          .links(d.edges)
          .nodes(d.vertices)
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
