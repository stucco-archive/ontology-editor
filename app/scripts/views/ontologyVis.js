/*global define, d3 */
/* jshint camelcase: false */
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
      var vis
        , color = d3.scale.category10()
        , force = d3.layout.force()
        , r     = 12
        , drag;

      this.after('initialize', function() {
        init(this.node, this.attr);
        this.on('#ontologyText', 'textChange', update);
      });

      function init(el, attr) {
        var w = attr.width
          , h = attr.height;

        vis = d3.select(el).append('svg')
          .attr('width', w)
          .attr('height', h);

        force.size([w, h])
          .linkDistance( d3.min([w, h]) / 2 )
          .charge( -(w * 0.8) );

        // See Sticky Force Layout: http://bl.ocks.org/mbostock/3750558
        drag = force.drag()
          .on('dragstart', function dragstart(d) {
            d.fixed = true;
            d3.select(this).classed('fixed', true);
          });

        force.on('tick', useTheForce);
      }

      function useTheForce() {
        vis.selectAll('line')
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

        vis.selectAll('.linktext')
          .attr('dx', function(d) { return (d.source.x + d.target.x)/2; })
          .attr('dy', function(d) { return (d.source.y + d.target.y)/2; });

        vis.selectAll('.nodetext')
          .attr('dx', function(d) { return d.x; })
          .attr('dy', function(d) { return d.y; });

        vis.selectAll('circle')
          .attr('cx', function(d) { return d.x; })
          .attr('cy', function(d) { return d.y; });
      }

      // Helper function to get at a node's parentNode's data
      function parent(el) {
        return el.parentNode.__data__;
      }

      function update(evt, d) {
        d = JSON.parse(d.text);

        // adjust edge attributes to work with d3.force
        d.edges.map(function (d) {
          d.source = parseInt(d._inV, 10);
          d.target = parseInt(d._outV, 10);
        });

        // TODO handle add/update/delete here.
        // See modifying a force layout: http://bl.ocks.org/mbostock/1095795
        // tl;dr: d3.force responds to push events. Only add nodes if they're new.
        d.edges.forEach(function(d) {
          if( !force.links().some(function(d2) { return d2._id === d.id; }) ) {
            force.links().push(d);
          }
        });
        d.vertices.forEach(function(d) {
          if( !force.nodes().some(function(d2) { return d2._id === d._id; }) ) {
            force.nodes().push(d);
          }
        });

        updateVis(d);
      }

      // TODO distinguish between force updates and visual updates
      function updateVis(d) {
        // links
        var link = vis.selectAll('.link')
          .data(d.edges, function(d) { return d._id; } );

        var linkG = link.enter().insert('g')
          .attr('class', 'link');

        linkG.append('line');
        linkG.append('text').attr('class', 'linktext');

        link.selectAll('line')
          .style('stroke-width', 1)
          .style('stroke', 'black');

        link.selectAll('text')
          .text(function() { return parent(this)._label; });

        link.exit().remove();

        // nodes
        var node = vis.selectAll('.node')
          .data(d.vertices, function(d) { return d._id; } );

        var nodeG = node.enter().append('g')
          .attr('class', 'node');

        nodeG.append('circle');
        nodeG.append('title');
        nodeG.append('text').attr('class', 'nodetext');

        node.selectAll('circle')
          .attr('r', r)
          .style('fill', function() { return color(parent(this).group); })
          .call(drag);

        node.selectAll('title')
          .text(function() { return parent(this).group; });

        node.selectAll('.nodetext')
          .attr('x', r)
          .attr('dy', '.35em')
          .text(function() { return parent(this).name; });

        node.exit().remove();

        force.start();
      }
    }

    return defineComponent(ontologyVis);
  }
);
