import React from "react";
import t from "prop-types";
import remark from "remark";
import remarkPing from "remark-ping";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: ""
    };
  }
  componentDidMount() {
    const remarkInst = remark()
      // Use remark-ping to transform tags (e.g. @javascript) into links
      .use(remarkPing, {
        pingUsername: tag => true,
        userURL: this.props.tagURL
      })
      .use(remarkRehype)
      .use(rehypeStringify)
      .use(rehypeHighlight);
    const result = remarkInst.process(this.props.source, (err, rendered) => {
      if (err) throw err;
      this.setState({ rendered });
    });
  }
  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.state.rendered }} />;
  }
}
Markdown.propTypes = {
  source: t.string.isRequired,
  tagURL: t.func
};
