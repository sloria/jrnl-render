# jrnl-render

<!-- [![Current Version](https://img.shields.io/npm/v/jrnl-render.svg)](https://www.npmjs.org/package/jrnl-render) -->
<!-- [![Build Status](https://travis-ci.org/sloria/jrnl-render.svg?branch=master)](https://travis-ci.org/sloria/jrnl-render) -->
<!-- [![Greenkeeper badge](https://badges.greenkeeper.io/sloria/jrnl-render.svg)](https://greenkeeper.io/) -->

Render a [jrnl](http://jrnl.sh) file as a webpage.

## Quickstart

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>My JRNL</title>
  </head>
  <body>
    <!-- CHANGEME: Use your own URL here -->
    <jrnl src="https://dl.dropboxusercontent.com/s/abcdef1234/jrnl.txt?dl=0" />
    <script src="https://unpkg.com/jrnl-render/dist/jrnl-render.standalone.min.js"></script>
  </body>
</html>
```

## Developing

* `npm install`
* To run tests: `npm test`
* To run tests in watch mode: `npm test -- --watch`

## License

MIT Licensed.
