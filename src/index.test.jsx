import fs from "fs";
import { resolve } from "path";
import jest from "jest";
import ReactDOM from "react-dom";
import React from "react";

import App from ".";

it("renders without crashing", () => {
  const src = fs.readFileSync(
    resolve(__dirname, "..", "examples", "jrnl.txt"),
    "utf8"
  );
  const div = document.createElement("div");
  ReactDOM.render(<App src={src} />, div);
});
