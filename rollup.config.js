import { resolve } from "path";

import alias from "rollup-plugin-alias";
import serve from "rollup-plugin-serve";
import json from "rollup-plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeResolve from "rollup-plugin-node-resolve";
import nodeGlobals from "rollup-plugin-node-globals";
import { uglify } from "rollup-plugin-uglify";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import postcss from "rollup-plugin-postcss";

const env = process.env.NODE_ENV;
const standalone = process.env.STANDALONE == "true";
const umdName = "jrnlRender";
const config = {
  plugins: [postcss()]
};

if (standalone) {
  config.input = resolve("src", "standalone.jsx");
  config.output = {
    format: "iife"
  };
  config.plugins.push(
    // transparently use preact in standalone build
    alias({
      react: resolve("./node_modules/preact-compat/dist/preact-compat.es.js"),
      "react-dom": resolve(
        "./node_modules/preact-compat/dist/preact-compat.es.js"
      )
    }),
    nodeResolve({ preferBuiltins: false }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  );
} else {
  config.input = resolve("src", "index.jsx");
  config.output = {
    name: umdName,
    format: "umd",
    globals: { react: "React", "react-dom": "ReactDOM" }
  };
  config.external = [
    "react",
    "react-dom",
    "jrnl-parse",
    "slugify",
    "prop-types",
    "remark",
    "remark-ping",
    "remark-rehype",
    "rehype-stringify",
    "rehype-highlight",
    "react-icons/io"
  ];
}

config.plugins.push(
  babel({
    // Needed for rollup: https://rollupjs.org/guide/en#babel
    // NOTE: this gets merged with .babelrc
    plugins: ["external-helpers"],
    exclude: ["**/*.json"]
  }),
  nodeBuiltins(),
  nodeGlobals(),
  json()
);

if (env === "production") {
  config.plugins.push(uglify());
}

if (process.env.SERVE === "true") {
  config.plugins.push(serve({ contentBase: ["dist", "example"], open: true }));
}

config.plugins.push(filesize());
export default config;
