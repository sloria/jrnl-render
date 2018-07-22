import jest from "jest";
import ReactDOM from "react-dom";
import React from "react";
import sinon from "sinon";

import App from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});
