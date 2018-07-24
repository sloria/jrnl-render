import fs from "fs";
import { resolve } from "path";
import jest from "jest";
import ReactDOM from "react-dom";
import React from "react";
import { render } from "enzyme";

import { JRNL } from ".";

describe("App", () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      resolve(__dirname, "..", "examples", "jrnl.txt"),
      "utf8"
    );
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<JRNL source={src} />, div);
  });

  it("renders entries", () => {
    const c = render(<JRNL source={src} />);
    expect(c.text()).toMatch("Setting up jrnl-render");
  });
});
