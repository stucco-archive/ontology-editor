# flight-fullscreen

A [Flight](https://github.com/flightjs/flight) component for the HTML5 [fullscreen](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&ved=0CEsQFjAE&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FGuide%2FDOM%2FUsing_full_screen_mode&ei=rDHgUfSQOa_liwK4t4DwAQ&usg=AFQjCNHFEa21FtnSHY241HtGflXgc7m0NQ&bvm=bv.49260673,d.cGE) API

Don't worry about cross browser compatibility, that is out job not yours.

This component is highly inspired in [screenfull.js](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCwQFjAA&url=https%3A%2F%2Fgithub.com%2Fsindresorhus%2Fscreenfull.js%2F&ei=-zPgUY-aFofjiAKNkoCgCw&usg=AFQjCNEIBbX6cIz4701dpgN94aN5EELSow&bvm=bv.49260673,d.cGE), an awesome JavaScript fullscreen library.

## Installation

```bash
bower install --save flight-fullscreen
```

## Example


### Feature detection

`fullscreen-supported` will trigger when the feature is supported

`fullscreen-unsupported` will trigger when the feature is not supported


### Use it

```javascript
define(function (require) {

  'use strict';

  var fullscreen = require('component/fullscreen');

  return initialize;

  function initialize() {

    fullscreen.attachTo('video', {
      requestEvents: ['click', 'click2'], // Events that will request fullscreen.
      exitEvents: ['other-event'], // Event that will exit fullscreen.
    });

    fullscreen.attachTo('#the-button', {
      toggleEvents: ['click'], // Events that toggle fullscreen.
      target: '#img-wrapper' // You can specify different target.
    });
  }
});
```


## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
