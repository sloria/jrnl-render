import React from "react";
import t from "prop-types";
import remark from "remark";
import remarkPing from "remark-ping";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export function renderMarkdown(source, { simple = false, tagURL = null } = {}) {
  // If simple is true, don't use remark-ping
  const plugins = (simple
    ? []
    : [
        [
          // Use remark-ping to convert tags to links
          remarkPing,
          {
            pingUsername: tag => true,
            userURL: tagURL
          }
        ]
      ]
  ).concat([remarkRehype, rehypeStringify, rehypeHighlight]);
  const remarkInst = remark().use(plugins);
  return new Promise((resolve, reject) => {
    const result = remarkInst.process(source, (err, rendered) => {
      err ? reject(err) : resolve(rendered.contents);
    });
  });
}

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: ""
    };
  }
  componentDidMount() {
    renderMarkdown(this.props.source, { tagURL: this.props.tagURL }).then(
      rendered => {
        this.setState({ rendered });
      }
    );
  }
  render() {
    const { source, tagURL, ...rest } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{ __html: this.state.rendered }}
        {...rest}
      />
    );
  }
}
Markdown.propTypes = {
  source: t.string.isRequired,
  tagURL: t.func
};
