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
        var prefix = 'gov.ornl.sava.stucco/graph/vertices/';

        d = JSON.parse(d.text);

        // adjust incoming schema to something that is more manageable
        d.vertices = d.properties.vertices.items;
        d.edges    = d.properties.edges.items;
        var newEdges = [];
        var edge;

        for (var i = 0; i < d.edges.length; i++) {
          //only consider edges with a specified list of in & out vertex types allowed
          if(d.edges[i].properties.inVType.enum && d.edges[i].properties.outVType.enum){
            //flatten it into a one-one edge list.
            for (var j = 0; j < d.edges[i].properties.inVType.enum.length; j++) {
              for (var k = 0; k < d.edges[i].properties.outVType.enum.length; k++) {
                // Deep copy old contents
                edge = jQuery.extend(true, {}, d.edges[i]);
                edge.inV = d.edges[i].properties.inVType.enum[j];
                edge.outV = d.edges[i].properties.outVType.enum[k];
                if(j>0 || k>0){ //rename ids if needed - they need to be unique for below.
                  edge.id = edge.id + j + ',' + k;
                  //console.log(edge.id);
                }
                newEdges.push(edge);
              }
            }
          }
        }
        d.edges = newEdges;
        //console.log(d.edges);

        // merge links with same source/target and concatenate title/descriptions
        var hasBeenMerged = [];
        _.each(d.edges, function(o) {
          _.each(d.edges, function(p) {
            if( o.id === p.id || _.contains(hasBeenMerged, o.id) ){ return; }
            if( (o.inV === p.inV && o.outV === p.outV) || (o.outV === p.inV && o.inV === p.outV) ) {

              // by merging titles only, we are still drawing two links
              // TODO delete p.
              o.title = o.title + ',' + p.title;
              p.title = '';

              hasBeenMerged.push(o.id);
              hasBeenMerged.push(p.id);
            }
          });
        });

        // merge nodes
        var allNodes = _.uniq( _.union(nodes, d.vertices), function(d) {
          return d.id;
        });
        _.each( allNodes, function(o) {
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
