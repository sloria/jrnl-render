# jrnl-render

[![Current Version](https://img.shields.io/npm/v/jrnl-render.svg)](https://www.npmjs.org/package/jrnl-render)
[![Build Status](https://travis-ci.org/sloria/jrnl-render.svg?branch=master)](https://travis-ci.org/sloria/jrnl-render)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=142367266)](https://dependabot.com)

Render a [jrnl](http://jrnl.sh) file as a webpage.

jrnl is a command-line journaling application that stores in
plain text files. If you put your files on Dropbox (or any other
hosting service), you can use jrnl-render to generate a webpage for your
journal(s).

## Demo

https://jrnl-render-demo.netlify.com/

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
    <jrnl src="https://dl.dropboxusercontent.com/s/abcdef1234/jrnl.txt" />
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

Custom loading message (supports Markdown):

```html
<jrnl loading="⌛️ Loading..." src="..." />
```

## Usage as a React component

```
npm i jrnl-render
```

```javascript
import JRNL from "jrnl-render";

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
