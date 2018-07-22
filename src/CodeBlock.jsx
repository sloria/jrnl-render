import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";

export default class CodeBlock extends React.PureComponent {
  render() {
    const { language, value } = this.props;
    return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
  }
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

CodeBlock.defaultProps = {
  language: null
};
