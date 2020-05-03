import { resolve } from "path";

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import nodeBuiltins from "rollup-plugin-node-builtins";
import nodeGlobals from "rollup-plugin-node-globals";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

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
  const outputSuffix = env === "production" ? ".min.js" : ".js";
  config.output = {
    file: `dist/jrnl-render.standalone${outputSuffix}`,
    format: "iife"
  };
  config.plugins.push(
    nodeResolve({ preferBuiltins: false }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env)
    }),
    commonjs()
  );
  if (env === "production") {
    config.plugins.push(terser());
  }
} else {
  config.input = resolve("src", "index.tsx");
  const outputSuffix = env === "production" ? ".debug.js" : ".js";
  config.output = {
    file: `dist/jrnl-render${outputSuffix}`,
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
    "rehype-highlight"
    // "react-icons/io",
  ];
}

config.plugins.push(
  babel({
    exclude: ["**/*.json"]
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
