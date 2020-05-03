import { render } from "enzyme";
import React from "react";

import Entry from "./Entry";

describe("Entry", () => {
  it("renders title and date", () => {
    const entry = {
      body: "**bar**",
      date: new Date(2020, 0, 1, 0),
      slug: "2020-01-01-foo",
      title: "Foo"
    };
    const noop = () => null;
    const c = render(<Entry entry={entry} onClickTag={noop} />);
    expect(c.text()).toMatch("Foo");
    expect(c.text()).toMatch("2020-01-01");
  });
});
