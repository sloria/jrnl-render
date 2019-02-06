import "highlight.js/styles/github.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "tachyons";
import "./App.css";
import App from "./index";

function autoInit(): void {
  const elem = document.querySelector("jrnl");
  if (!elem) {
    throw new Error('<jrnl src="..." /> tag not found on the page.');
  }
  const src = elem.getAttribute("src");
  if (!src) {
    throw new Error('"src" attribute is required on <jrnl> tag.');
  }
  const title = elem.getAttribute("jrnl-title") || null;
  const copyright = elem.getAttribute("copyright") || "";
  const loadingMessage = elem.getAttribute("loading") || null;
  ReactDOM.render(
    <App
      url={src}
      source={null}
      title={title}
      copyright={copyright}
      loadingMessage={loadingMessage}
    />,
    elem
  );
}

document.addEventListener("DOMContentLoaded", autoInit);
