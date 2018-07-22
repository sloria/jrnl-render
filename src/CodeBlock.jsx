import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";

// https://gist.github.com/ibrahima/d21950a95aee3212e991a8404e238093
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
