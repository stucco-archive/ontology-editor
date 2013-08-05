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
      var vis
        , color = d3.scale.category10()
        , force = d3.layout.force();

      function init(el, attr) {
        var w = attr.width
          , h = attr.height;

        vis = d3.select(el).append('svg')
          .attr('width', w)
          .attr('height', h);

        force.size([w, h])
          .linkDistance( d3.min([w, h]) / 2 )
          .charge( -(w * 0.8) );
      }

      function parent(el) {
        return el.parentNode.__data__;
      }

      function update(evt, d) {
        var d = JSON.parse(d.text)
          , r = 12;

        // adjust edge attributes to work with d3.force
        d.edges.map(function (d) {
          d.source = parseInt(d._inV, 10);
          d.target = parseInt(d._outV, 10);
        });

        // stop force before adjusting edges
        force.stop()
          .links(d.edges)
          .nodes(d.vertices);

        var links = vis.selectAll('.link')
          .data( force.links(), function(d) { return d._id; } );

        var linkGroup = links.enter().append('g')
          .attr('class', 'link');

        // enter
        linkGroup.append('line')
          .style('stroke-width', 1)
          .style('stroke', 'black');

        linkGroup.append('text')
          .attr('class', 'linktext');

        // update
        links.selectAll('text')
          .text(function(d) { return parent(this)._label; });

        links.exit().remove();

        var nodes = vis.selectAll('.node')
          .data(force.nodes(), function(d) { return d._id; });

        var nodeGroup = nodes.enter().append('g')
          .attr('class', 'node');

        // enter
        nodeGroup.append('circle')
          .attr('r', r);

        nodeGroup.append('title');

        nodeGroup.append('text')
          .attr('class', 'nodetext')
          .attr('x', r)
          .attr('dy', '.35em');

        // update
        nodes.selectAll('circle')
          .style('fill', function(d) { return color(parent(this).group); })
          .call(force.drag);

        nodes.selectAll('title')
          .text(function(d) { return parent(this).group; });

        nodes.selectAll('.nodetext')
          .text(function(d) { return parent(this).name; });

        // exit
        nodes.exit().remove();

        force.on('tick', function() {
          links.selectAll('line')
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });

          links.selectAll('.linktext')
            .attr('dx', function(d) { return (d.source.x + d.target.x)/2; })
            .attr('dy', function(d) { return (d.source.y + d.target.y)/2; });

          nodes.selectAll('.nodetext')
            .attr('dx', function(d) { return d.x; })
            .attr('dy', function(d) { return d.y; });

          nodes.selectAll('circle')
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        });

        force.start();
      }

      this.after('initialize', function() {
        init(this.node, this.attr);
        this.on('#ontologyText', 'textChange', update);
      });

    }

    return defineComponent(ontologyVis);
  }
);
