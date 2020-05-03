import { render } from "enzyme";
import * as fs from "fs";
import { resolve } from "path";
import React from "react";
import ReactDOM from "react-dom";

import JRNL, { IJRNLProps } from "./JRNL";

describe("JRNL", () => {
  let src;
  let props: IJRNLProps;
  beforeAll(() => {
    src = fs.readFileSync(
      resolve(__dirname, "..", "example", "jrnl.txt"),
      "utf8"
    );
    props = {
      copyright: null,
      filter: "",
      loaded: true,
      loadingMessage: null,
      onClickTag: (t: string) => null,
      onInputChange: (e: React.FormEvent<HTMLInputElement>) => null,
      source: src,
      title: ""
    };
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<JRNL {...props} />, div);
  });

  it("renders entries", () => {
    const c = render(<JRNL {...props} />);
    expect(c.text()).toMatch("Setting up jrnl-render");
  });

  it("renders empty state", () => {
    const noSourceProps = { ...props, source: "" };
    const c = render(<JRNL {...noSourceProps} />);
    expect(c.text()).toMatch("No entries to show.");
  });

  // TODO: Make these work with async markdown rendering
  // it("renders loading message", () => {
  //   const c = render(<JRNL loaded={false} source="" />);
  //   expect(c.text()).toMatch("Loading entries");
  //
  //   const c2 = render(
  //     <JRNL loaded={false} loadingMessage="Foo bar baz" source="" />
  //   );
  //   expect(c2.text()).toMatch("Foo bar baz");
  // });
});
