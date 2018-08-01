import React from "react";
import t from "prop-types";
import renderMarkdown from "./render-markdown";

const Loader = ({ message }) => (
  <div className="Loader tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    <p dangerouslySetInnerHTML={{ __html: message || "Loading entries…" }} />
  </div>
);
Loader.propTypes = {
  message: t.string
};

class MarkdownLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: ""
    };
  }
  componentDidMount() {
    const { message } = this.props;
    if (message) {
      renderMarkdown(message, { simple: true }).then(rendered => {
        this.setState({ rendered });
      });
    }
  }
  render() {
    // TODO: Use Markdown component
    return <Loader message={this.state.rendered} />;
  }
}
MarkdownLoader.propTypes = {
  message: t.string
};

export default MarkdownLoader;
