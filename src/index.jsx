import parse from "jrnl-parser";
import Markdown from "react-markdown";
import React from "react";
import t from "prop-types";

import CodeBlock from "./CodeBlock.jsx";
import fetchTxt from "./fetch-txt";
import remarkTags, { Ping } from "./remark-tags";

const EntryBody = ({ body, onClickTag }) => (
  <p className="f6 f5-l lh-copy">
    <Markdown
      source={body}
      renderers={{ code: CodeBlock, ping: Ping }}
      astPlugins={[
        remarkTags({
          onClick: onClickTag
        })
      ]}
    />
  </p>
);
EntryBody.propTypes = {
  body: t.string,
  onClickTag: t.function
};

const EntryContainer = ({ date, children }) => (
  <article className="bt bb b--black-10">
    <div className="db pv5 ph3 ph0-l">
      <div className="flex flex-column flex-row-ns">
        <div className="w-100">{children}</div>
      </div>
    </div>
    <time className="f7 code mb2 db gray">{formatDate(date)}</time>
  </article>
);
EntryContainer.propTypes = {
  children: t.array,
  date: t.instanceOf(Date)
};
const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23

const Entry = ({ entry, onClickTag }) => (
  <EntryContainer date={entry.date}>
    <h1 className="f3 fw7 mt0 lh-title">{entry.title}</h1>
    <EntryBody body={entry.body} onClickTag={onClickTag} />
  </EntryContainer>
);
Entry.propTypes = {
  entry: t.object,
  onClickTag: t.function
};

const Loader = () => <div className="tc ma6 code gray">Loading entries…</div>;
const Empty = () => (
  <p className="code gray">No entries to show. Try a different search.</p>
);

const SearchInput = props => (
  <input
    className="code f7 input-reset pa2 br2 ba b--black-20 bg-white animated-shadow"
    {...props}
  />
);

const Header = ({ title, onInputChange, filter }) => (
  <header className="flex mt4 mb3 mw8 center">
    <h2 className="f4 mv0 pv2">
      <a className="no-underline dim near-black" href="/">
        {title || "JRNL"}
      </a>
    </h2>
    <div className="flex-auto" />
    <nav className="tc lh-title flex mb1">
      <SearchInput
        autoFocus
        placeholder="Search..."
        onChange={onInputChange}
        value={filter}
      />
    </nav>
  </header>
);
Header.propTypes = {
  title: t.string,
  onInputChange: t.function,
  filter: t.string
};

const JRNL = ({ title, source, loaded, filter, onInputChange, onClickTag }) => {
  const parsed = source ? parse(source) : [];
  // Show entries in reverse chronological order
  let entries = parsed.reverse();
  if (filter) {
    entries = entries.filter(
      entry => entry.title.includes(filter) || entry.body.includes(filter)
    );
  }
  return (
    <div className="mw7 center sans-serif near-black">
      <Header title={title} onInputChange={onInputChange} filter={filter} />
      <section>
        {loaded ? (
          entries.length ? (
            entries.map((entry, i) => (
              <Entry key={i} entry={entry} onClickTag={onClickTag} />
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
  onInputChange: t.function,
  onClickTag: t.function
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
    this.setState({ loaded: false });
    fetchTxt(this.props.src).then(source => {
      this.setState({ source, loaded: true });
    });
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
