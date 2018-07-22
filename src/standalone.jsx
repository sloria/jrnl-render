import React from "react";
import ReactDOM from "react-dom";
import App from "./index.jsx";
import "tachyons";

function autoInit() {
  const elem = document.querySelector("jrnl");
  if (!elem) {
    throw new Error('<jrnl src="..." /> tag not found on the page.');
  }
  const src = elem.getAttribute("src");
  if (!src) {
    throw new Error('"src" attribute is required on <jrnl> tag.');
  }
  const title = elem.getAttribute("title") || "";
  ReactDOM.render(<App src={src} title={title} />, elem);
}

document.addEventListener("DOMContentLoaded", autoInit);
