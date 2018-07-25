import React from "react";
import t from "prop-types";
import renderMarkdown from "./render-markdown";

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
