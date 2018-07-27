import fs from "fs";
import { resolve } from "path";
import ReactDOM from "react-dom";
import React from "react";
import { render } from "enzyme";

import { JRNL } from ".";

describe("App", () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      resolve(__dirname, "..", "example", "jrnl.txt"),
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

  it("renders empty state", () => {
    const c = render(<JRNL source="" />);
    expect(c.text()).toMatch("No entries to show.");
  });

  it("renders loading message", () => {
    const c = render(<JRNL loaded={false} source="" />);
    expect(c.text()).toMatch("Loading entries");

    const c2 = render(
      <JRNL loaded={false} loadingMessage="Foo bar baz" source="" />
    );
    expect(c2.text()).toMatch("Foo bar baz");
  });
});
