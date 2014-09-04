/* global define */
define(
  [
    'flight/lib/component',
    'jquery'
  ],

  function(defineComponent)  {
    'use strict';

    function load() {

      this.after('initialize', function() {
        var self = this;
        $.getJSON(this.attr.file)
        .success(function(data) {
          console.log('Success');
          self.trigger(document, 'data.init', {graph: data});
        })
        .error(function(err) {
          console.error('Error');
          console.error(err);
        });
      });

    }

    return defineComponent(load);
  }
);
