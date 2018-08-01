import React from "react";
import t from "prop-types";

import getQueryParam from "./get-query-param";
import fetchTxt from "./fetch-txt";
import JRNL from "./JRNL.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: loading indicator
      // TODO: Error state
      loaded: true,
      source: null,
      filter: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClickTag = this.handleClickTag.bind(this);
  }
  handleInputChange(e) {
    this.setState({ filter: e.target.value });
  }
  handleClickTag(tag) {
    this.setState({ filter: tag });
  }
  componentDidMount() {
    const filter = getQueryParam("q") || "";
    // Try to guess if a URL was passed
    if (this.props.url) {
      this.setState({ filter, loaded: false });
      fetchTxt(this.props.url).then(source => {
        this.setState({ source, loaded: true });
      });
    } else if (this.props.source) {
      this.setState({ source: this.props.source });
    }
  }
  render() {
    return (
      <JRNL
        loaded={this.state.loaded}
        loadingMessage={this.props.loadingMessage}
        title={this.props.title}
        copyright={this.props.copyright}
        source={this.state.source}
        filter={this.state.filter}
        onInputChange={this.handleInputChange}
        onClickTag={this.handleClickTag}
      />
    );
  }
}
App.propTypes = {
  url: t.string,
  source: t.string,
  title: t.string,
  copyright: t.string,
  loadingMessage: t.string
};

export default App;
