import React from "react";
import renderMarkdown from "./render-markdown";

interface IProps {
  source: string;
  simple?: boolean;
  tagURL?: (tag: string) => string;
}
const Markdown = ({
  source,
  simple,
  tagURL,
  ...rest
}: IProps & React.HTMLAttributes<any>) => {
  const rendered = renderMarkdown(source, { simple, tagURL });
  return <div dangerouslySetInnerHTML={{ __html: rendered }} {...rest} />;
};

export default Markdown;
