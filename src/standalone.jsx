import React from "react";
import ReactDOM from "react-dom";
import App from "./index.jsx";
import "tachyons";
import "highlight.js/styles/github.css";
import "./App.css";

function autoInit() {
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
      title={title}
      copyright={copyright}
      loadingMessage={loadingMessage}
    />,
    elem
  );
}

document.addEventListener("DOMContentLoaded", autoInit);
