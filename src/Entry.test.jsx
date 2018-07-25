import ReactDOM from "react-dom";
import React from "react";
import { render } from "enzyme";

import Entry from "./Entry.jsx";

describe("Entry", () => {
  it("renders title and date", () => {
    const entry = {
      title: "Foo",
      body: "**bar**",
      date: new Date(2020, 0, 1, 0),
      slug: "2020-01-01-foo"
    };
    const c = render(<Entry entry={entry} onClickTag={() => null} />);
    expect(c.text()).toMatch("Foo");
    expect(c.text()).toMatch("2020-01-01");
  });
});
