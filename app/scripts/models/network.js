/* global define, _ */
define(
  [
    'flight/lib/component',
    'underscore'
  ],

  function(defineComponent) {
    'use strict';

    function network() {
      var nodes = []
        , links = [];

      this.after('initialize', function() {
        this.on(document, 'textChange', update);
      });

      function adjustNetwork(d) {
        d.vertices = d.properties.vertices.items;
        d.edges    = d.properties.edges.items;

        d.edges = d.edges.map(function(d) {
          d.inV = d.properties.inVType.enum[0];
          d.outV = d.properties.outVType.enum[0];
          return d;
        });

        return d;
      }

      // Each update, we have two sets of nodes/links: 
      //   nodes/links (old) and d.edges/d.vertices (new).
      //
      // We merge them according to this criteria:
      //
      //   - in new and old -> update
      //   - in new but not old -> push into nodes/links  
      //   - in old but not new -> remove
      //
      // Also see modifying a force layout: http://bl.ocks.org/mbostock/1095795
      // tl;dr: d3.force responds to push events. Only add nodes if they're new.
      function update(evt, d) {
        d = JSON.parse(d.text);

        // TODO copy edges and vertices into the format I need/want. Adjust as needed.
        // TODO (this means identifying all the properties I used:
        // 
        // old, new, want
        // _id (int), id (string), id (?)
        // target, properties.inVType.enum[0], target
        // source, properties.outVType.enum[0], source
        // _label, title, title
        // name, title, title
        // group, null, null
        //
        // Vertices/Edges now have .description, this would be good to show.
        //

        d = adjustNetwork(d);

        var prefix = 'gov.ornl.sava.stucco/graph/vertices/';

        // merge nodes
        var allNodes = _.uniq( _.union(nodes, d.vertices), function(d) {
          return d.id;
        });
        _.each( allNodes, function(o) {
          // TODO simplify/functionify the filter part
          var inNew = _.filter(d.vertices, function(d) { return d.id === o.id; })[0]
            , inOld = _.filter(nodes, function(d) { return d.id === o.id; })[0];

          if( inNew && inOld ) {
            _.extend(inOld, inNew);
          } else if ( inNew && !inOld ) {
            nodes.push(inNew);
          } else if ( !inNew && inOld ) {
            // ignore links attached to this edge
            d.edges = _.reject(d.edges, function(d) { return prefix+d.inV === inOld.id || prefix+d.outV === inOld.id; });
            nodes = _.reject(nodes, function(d) { return d.id === inOld.id; });
          }
        });

        // adjust edge source and targets to work with d3.force
        d.edges.map(function (d) {
          d.source = _.find(nodes, function(o) { return o.id === prefix+d.outV; });
          d.target = _.find(nodes, function(o) { return o.id === prefix+d.inV; });
        });

        // merge links
        var allLinks = _.uniq( _.union(links, d.edges), function(d) {
          return d.id;
        });
        _.each( allLinks, function(o) {
          var inNew = _.filter(d.edges, function(d) { return d.id === o.id; })[0]
            , inOld = _.filter(links, function(d) { return d.id === o.id; })[0];

          if( inNew && inOld ) {
            _.extend(inOld, inNew);
          } else if ( inNew && !inOld ) {
            // on link add, ensure source and target exist
            if( inNew.source && inNew.target ) {
              links.push(inNew);
            }
          } else if ( !inNew && inOld ) {
            links = _.reject(links, function(o) { return o.id === inOld.id; });
          }
        });

        this.trigger('nodeUpdate', {nodes: nodes, links: links});
      }

    }

    return defineComponent(network);
  }
);
