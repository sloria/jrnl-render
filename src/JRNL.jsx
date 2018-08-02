import React from "react";
import t from "prop-types";

import Entry from "./Entry.jsx";
import { slugifyEntry } from "./utils";
import parse from "jrnl-parse";
import Markdown from "./Markdown.jsx";

const Empty = ({ children }) => (
  <div className="Empty tc mt5 mh5 mt6-l mh6-l code gray vh-75">{children}</div>
);
Empty.propTypes = {
  children: t.node
};

const Loader = ({ message }) => (
  <div className="Loader tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    <Markdown source={message || "Loading entries…"} simple={true} />
  </div>
);
Loader.propTypes = {
  message: t.string
};

const SearchInput = props => (
  <input
    className="Search code f7 input-reset pa2 br2 ba b--black-20 bg-white hover-dark-blue"
    {...props}
  />
);

const Footer = ({ copyright }) => (
  <footer className="Footer pv4 ph3 ph5-m ph6-l mid-gray">
    {copyright && (
      <small className="Footer-copyright u-markdown f6 db tc">
        <Markdown source={copyright} simple={true} />
      </small>
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
        {loaded === false ? (
          <Loader message={loadingMessage} />
        ) : loaded === null ? (
          <Empty />
        ) : entries.length ? (
          entries.map(entry => (
            <Entry key={entry.slug} entry={entry} onClickTag={onClickTag} />
          ))
        ) : (
          <Empty>
            <p>No entries to show. Try a different search.</p>
          </Empty>
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
