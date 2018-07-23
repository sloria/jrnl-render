import parse from "jrnl-parse";
import slugify from "slugify";
import React from "react";
import t from "prop-types";

import getQueryParam from "./get-query-param";
import fetchTxt from "./fetch-txt";
import Markdown from "./Markdown.jsx";

const EntryBody = ({ body, onClickTag }) => (
  <div className="Markdown f6 f5-l lh-copy">
    <Markdown source={body} tagURL={tag => `?q=@${tag}`} />
  </div>
);
EntryBody.propTypes = {
  body: t.string,
  onClickTag: t.func
};

const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23
const makeSlug = entry =>
  `${formatDate(entry.date)}-${slugify(entry.title, { lower: true })}`;

const EntryContainer = ({ slug, date, children }) => (
  <article id={slug} className="bt bb b--black-10">
    <div className="db pv5 ph3 ph0-l">
      <div className="flex flex-column flex-row-ns">
        <div className="w-100">{children}</div>
      </div>
    </div>
    <time className="f7 code mb2 db">
      <a className="gray dim no-underline" title={slug} href={`#${slug}`}>
        {formatDate(date)}
      </a>
    </time>
  </article>
);
EntryContainer.propTypes = {
  children: t.array,
  date: t.instanceOf(Date).isRequired,
  slug: t.string.isRequired
};
const Entry = ({ entry, onClickTag }) => {
  return (
    <EntryContainer slug={entry.slug} date={entry.date}>
      <h1 className="f3 fw7 mt0 lh-title">{entry.title}</h1>
      <EntryBody body={entry.body} onClickTag={onClickTag} />
    </EntryContainer>
  );
};
Entry.propTypes = {
  entry: t.object,
  onClickTag: t.func
};

const Loader = () => (
  <div className="tc ma6 code gray">
    <p>Loading entries…</p>
  </div>
);
const Empty = () => (
  <div className="tc ma6 code gray">
    <p>No entries to show. Try a different search.</p>
  </div>
);

const SearchInput = props => (
  <input
    className="code f7 input-reset pa2 br2 ba b--black-20 bg-white hover-dark-green animated-shadow"
    {...props}
  />
);

const Header = ({ title, onInputChange, filter }) => (
  <header className="flex mt4 mb3 mw8 center">
    <h2 className="f4 mv0 pv2">
      <a className="no-underline hover-dark-pink near-black" href="/">
        {title || "JRNL"}
      </a>
    </h2>
    <div className="flex-auto" />
    <div className="tc lh-title flex mb1">
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

const JRNL = ({ title, source, loaded, filter, onInputChange, onClickTag }) => {
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
    <div className="mw7 center sans-serif near-black">
      <Header title={title} onInputChange={onInputChange} filter={filter} />
      <section>
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
    </div>
  );
};
JRNL.propTypes = {
  title: t.string,
  source: t.string,
  loaded: t.bool,
  filter: t.string,
  onInputChange: t.func,
  onClickTag: t.func
};

export default class App extends React.Component {
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
    this.setState({ filter, loaded: false });
    const src = this.props.src.trim();
    // Try to guess if a URL was passed
    if (
      src.startsWith("http://") ||
      src.startsWith("/") ||
      src.startsWith(".")
    ) {
      fetchTxt(this.props.src).then(source => {
        this.setState({ source, loaded: true });
      });
    } else {
      this.setState({ source: this.props.src });
    }
  }
  render() {
    return (
      <JRNL
        loaded={this.state.loaded}
        title={this.props.title}
        source={this.state.source}
        filter={this.state.filter}
        onInputChange={this.handleInputChange}
        onClickTag={this.handleClickTag}
      />
    );
  }
}

App.propTypes = {
  src: t.string.isRequired,
  title: t.string
};
