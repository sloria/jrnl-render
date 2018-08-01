import React from "react";
import t from "prop-types";

import Entry from "./Entry.jsx";
import MarkdownLoader from "./MarkdownLoader.jsx";
import { slugifyEntry } from "./utils";
import parse from "jrnl-parse";
import renderMarkdown from "./render-markdown";

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
            </a>
            . Rendered with{" "}
            <a
              className="link"
              href="https://github.com/sloria/jrnl-render"
              target="_blank"
              rel="noopener noreferrer"
            >
              jrnl-render
            </a>
            .
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

const JRNL = ({
  title,
  source,
  loaded,
  loadingMessage,
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
    entry.slug = slugifyEntry(entry);
  });
  if (filter) {
    // Naive search. If all tokens are in the
    // title+body, it's a hit
    const entryFilter = entry => {
      const filterTokens = filter.split(/\s+/);
      const entryLower = `${entry.title}\n${entry.body}`.toLowerCase();
      const filterLower = filter.toLowerCase();
      for (const token of filterTokens) {
        if (!entryLower.includes(token)) {
          return false;
        }
      }
      return true;
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
          <MarkdownLoader message={loadingMessage} />
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
  copyright: t.string,
  loadingMessage: t.string
};
JRNL.defaultProps = {
  loaded: true
};

export default JRNL;
