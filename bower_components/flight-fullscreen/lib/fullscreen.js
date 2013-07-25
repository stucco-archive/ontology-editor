define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(fullscreen);

  function fullscreen() {
    this.defaultAttrs({
      requestEvents: [],
      exitEvents: [],
      toggleEvents: []
    });

    this.crossBrowser = {};

    this.requestFullscreen = function (ev) {
      this.target()[this.crossBrowser.requestFullscreen]();
      this.trigger('fullscreen-requested');
    };

    this.exitFullscreen = function () {
      document[this.crossBrowser.exitFullscreen]();
      this.trigger('fullscreen-exited');
    };

    this.toggleFullscreen = function () {
      if (this.isFullscreen()) {
        this.exitFullscreen();
      } else {
        this.requestFullscreen();
      }
    };

    this.isFullscreen = function () {
      return !!document[this.crossBrowser.fullscreenElement];
    };

    this.target = function () {
      return this.attr.target ? document.querySelector(this.attr.target) : this.$node[0];
    };

    this.before('initialize', function () {
      this.setupCrossBrowserSupport();
    });

    this.after('initialize', function () {

      if (this.crossBrowser.requestFullscreen) {
        this.trigger('fullscreen-supported');
        this.on(this.attr.requestEvents.join(' '), this.requestFullscreen);
        this.on(this.attr.exitEvents.join(' '), this.exitFullscreen);
        this.on(this.attr.toggleEvents.join(' '), this.toggleFullscreen);
      } else {
        this.trigger('fullscreen-unsupported');
      }
    });

    this.setupCrossBrowserSupport = function () {
      var val, valLength;
      var fnMap = [
        [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
          ],
        // new WebKit
        [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
        ],
        // old WebKit (Safari 5.1)
        [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'
        ],
        [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
        ]
      ];
      var i = 0;
      var l = fnMap.length;

      for (; i < l; i++) {
        val = fnMap[i];
        if (val && val[1] in document) {
          for (i = 0, valLength = val.length; i < valLength; i++) {
            this.crossBrowser[fnMap[0][i]] = val[i];
          }
          return true;
        }
      }
      return false;
    };
  }

});
