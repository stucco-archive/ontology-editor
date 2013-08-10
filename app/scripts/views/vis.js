/* global define, d3, _ */
/* jshint camelcase: false */
define(
  [
    'flight/lib/component',
    'jquery',
    'underscore',
    'd3',
    'd3chart'
  ],

  function(defineComponent)  {
    'use strict';

    function vis() {
      var vis
        , color = d3.scale.category10()
        , force = d3.layout.force()
        , r     = 12
        , drag;

      this.after('initialize', function() {
        init(this.node, this.attr);
        this.on(document, 'textChange', update);
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

        // Each update, we have two sets of nodes/links: 
        //   force.nodes()/links() (old) and d.edges/d.vertices (new).
        //
        // We merge them according to this criteria:
        //
        //   - in new and old -> update
        //   - in new but not old -> push into force.nodes()/links()  
        //   - in old but not new -> remove
        //
        // Also see modifying a force layout: http://bl.ocks.org/mbostock/1095795
        // tl;dr: d3.force responds to push events. Only add nodes if they're new.

        // merge nodes
        var allNodes = _.uniq( _.union(force.nodes(), d.vertices), function(d) {
          return d._id;
        });
        _.each( allNodes, function(o) {
          var inNew = _.filter(d.vertices, function(d) { return d._id === o._id; })[0]
            , inOld = _.filter(force.nodes(), function(d) { return d._id === o._id; })[0];

          if( inNew && inOld ) {
            _.extend(inOld, inNew);
          } else if ( inNew && !inOld ){
            force.nodes().push(inNew);
          } else if ( !inNew && inOld ) {
            // ignore links attached to this edge
            d.edges = _.reject(d.edges, function(d) { return d._inV === inOld._id || d._outV === inOld._id; });
            force.nodes( _.reject(force.nodes(), function(d) { return d._id === inOld._id; }) );
          }
        });

        // adjust edge source and targets to work with d3.force
        d.edges.map(function (d) {
          d.source = _.find(force.nodes(), function(o) { return o._id === d._inV; });
          d.target = _.find(force.nodes(), function(o) { return o._id === d._outV; });
        });

        // merge links
        var allLinks = _.uniq( _.union(force.links(), d.edges), function(d) {
          return d._id;
        });
        _.each( allLinks, function(o) {
          var inNew = _.filter(d.edges, function(d) { return d._id === o._id; })[0]
            , inOld = _.filter(force.links(), function(d) { return d._id === o._id; })[0];

          if( inNew && inOld ) {
            _.extend(inOld, inNew);
          } else if ( inNew && !inOld ){
            // on link add, ensure source and target exist
            if( inNew.source && inNew.target ){
              force.links().push(inNew);
            }
          } else if ( !inNew && inOld ) {
            force.links( _.reject(force.links(), function(o) { return o._id === inOld._id; }) );
          }
        });

        updateVis();
      }

      function updateVis() {
        // links
        var link = vis.selectAll('.link')
          .data(force.links(), function(d) {  return d._id; } );

        link.exit().remove();

        var linkG = link.enter().append('g')
          .attr('class', 'link');

        linkG.append('line');
        linkG.append('text').attr('class', 'linktext');

        link.selectAll('line')
          .style('stroke-width', 1)
          .style('stroke', 'black');

        link.selectAll('text')
          .text(function() { return parent(this)._label; });

        // nodes
        var node = vis.selectAll('.node')
          .data(force.nodes(), function(d) { return d._id; } );

        node.exit().remove();

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

        force.start();
      }
    }

    return defineComponent(vis);
  }
);
