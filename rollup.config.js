import { resolve } from "path";

import alias from "rollup-plugin-alias";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import json from "rollup-plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeResolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;
const standalone = process.env.STANDALONE === "true";
const config = {
  plugins: [typescript(), postcss()],
  watch: {
    chokidar: true,
    include: "src/**"
  }
};

if (standalone) {
  config.input = resolve("src", "standalone.tsx");
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
  if (env === "production") {
    config.plugins.push(uglify());
  }
} else {
  config.input = resolve("src", "index.tsx");
  config.output = {
    format: "cjs"
  };
  config.external = [
    "react",
    "react-dom",
    "jrnl-parse",
    "slugify",
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
    exclude: ["**/*.json"],
    // Needed for rollup: https://rollupjs.org/guide/en#babel
    // NOTE: this gets merged with .babelrc
    plugins: ["external-helpers"]
  }),
  nodeBuiltins(),
  nodeGlobals(),
  json()
);

if (process.env.SERVE === "true") {
  config.plugins.push(serve({ contentBase: ["dist", "example"], open: true }));
}

config.plugins.push(filesize());
export default config;
