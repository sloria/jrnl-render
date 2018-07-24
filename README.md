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

## Customization

Customize title:

```html
<jrnl title="My Journal" src="..." />
```

Optional copyright in footer (supports Markdown):

```html
<jrnl copyright="Copyright 2018 by [Steven Loria](https://stevenloria.com)" src="..." />
```

## Usage as a React component

```javascript
import JRNL from "jrnl-render";

// somewhere in your component
<JRNL
  src="..."
  title="My Journal"
  copyright="Copyright 2018 by Steven Loria"
  />
```

## Developing

* `npm install`
* To run tests: `npm test`
* To run tests in watch mode: `npm test -- --watch`

## License

MIT Licensed.
