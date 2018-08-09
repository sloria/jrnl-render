import React from "react";
import t from "prop-types";
import renderMarkdown from "./render-markdown";

const Markdown = ({ source, simple, tagURL, ...rest }) => {
  const rendered = renderMarkdown(source, { simple, tagURL });
  return <div dangerouslySetInnerHTML={{ __html: rendered }} {...rest} />;
};
Markdown.propTypes = {
  source: t.string.isRequired,
  simple: t.bool,
  tagURL: t.func
};

export default Markdown;
