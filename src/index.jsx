import parse from "jrnl-parse";
import slugify from "slugify";
import React from "react";
import t from "prop-types";

import getQueryParam from "./get-query-param";
import fetchTxt from "./fetch-txt";
import Entry from "./Entry";
import renderMarkdown from "./render-markdown";

const Loader = () => (
  <div className="Loader tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    <p>Loading entries…</p>
  </div>
);
const Empty = () => (
  <div className="Empty tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    <p>No entries to show. Try a different search.</p>
  </div>
);

const SearchInput = props => (
  <input
    className="Search code f7 input-reset pa2 br2 ba b--black-20 bg-white hover-dark-blue"
    {...props}
  />
);

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: ""
    };
  }
  componentDidMount() {
    const { copyright } = this.props;
    if (copyright) {
      renderMarkdown(copyright, { simple: true }).then(rendered => {
        this.setState({ rendered });
      });
    }
  }
  render() {
    return (
      <footer className="Footer pv4 ph3 ph5-m ph6-l mid-gray">
        {this.state.rendered && (
          <small
            dangerouslySetInnerHTML={{ __html: this.state.rendered }}
            className="Footer-copyright u-markdown f6 db tc"
          />
        )}
        <div className="tc mt3">
          <small className="Footer-postscript f6">
            Written with{" "}
            <a
              className="link"
              href="http://jrnl.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              jrnl
            </a>. Rendered with{" "}
            <a
              className="link"
              href="https://github.com/sloria/jrnl-render"
              target="_blank"
              rel="noopener noreferrer"
            >
              jrnl-render
            </a>.
          </small>
        </div>
      </footer>
    );
  }
}
Footer.propTypes = {
  copyright: t.string
};

const Header = ({ title, onInputChange, filter }) => (
  <header className="Header flex mt4 mb3 mw8 center">
    <h2 className="Header-brand f4 mv0 pv2 ph3 ph0-l">
      <a className="no-underline hover-dark-pink near-black" href="/">
        {title || "JRNL"}
      </a>
    </h2>
    <div className="flex-auto" />
    <div className="Header-search tc lh-title flex mb1">
      <SearchInput
        autoFocus
        placeholder="Search..."
        onChange={onInputChange}
        value={filter}
      />
    </div>
  </header>
);
Header.propTypes = {
  title: t.string,
  onInputChange: t.func,
  filter: t.string
};

export const makeSlug = entry =>
  `${formatDate(entry.date)}-${slugify(entry.title, { lower: true })}`;
export const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23

export const JRNL = ({
  title,
  source,
  loaded,
  copyright,
  filter,
  onInputChange,
  onClickTag
}) => {
  const parsed = source ? parse(source) : [];
  // Show entries in reverse chronological order
  let entries = parsed.reverse();
  // Add slug field to each entry
  entries.forEach(entry => {
    entry.slug = makeSlug(entry);
  });
  if (filter) {
    const entryFilter = entry => {
      const entryLower = `${entry.title}\n${entry.body}`.toLowerCase();
      const filterLower = filter.toLowerCase();
      return entryLower.includes(filterLower);
    };
    entries = entries.filter(entryFilter);
  }
  return (
    <div className="App mw7 center sans-serif near-black">
      <Header title={title} onInputChange={onInputChange} filter={filter} />
      <section className="min-vh-75">
        {loaded ? (
          entries.length ? (
            entries.map((entry, i) => (
              <Entry key={entry.slug} entry={entry} onClickTag={onClickTag} />
            ))
          ) : (
            <Empty />
          )
        ) : (
          <Loader />
        )}
      </section>
      <Footer copyright={copyright} />
    </div>
  );
};
JRNL.propTypes = {
  title: t.string,
  source: t.string,
  loaded: t.bool,
  filter: t.string,
  onInputChange: t.func,
  onClickTag: t.func,
  copyright: t.string
};
JRNL.defaultProps = {
  loaded: true
};

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
  copyright: t.string
};

export default App;
