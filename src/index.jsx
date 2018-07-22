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

const EntryContainer = ({ children }) => (
  <article className="bt bb b--black-10">
    <div className="db pv4 ph3 ph0-l black">
      <div className="flex flex-column flex-row-ns">
        <div className="w-100">{children}</div>
      </div>
    </div>
  </article>
);
EntryContainer.propTypes = {
  children: t.array
};
const formatDate = date => date.toISOString().slice(0, 10); // 2020-02-23

const Entry = ({ entry, onClickTag }) => (
  <EntryContainer>
    <h1 className="f3 fw7 avenir mt0 lh-title">{entry.title}</h1>
    <EntryBody body={entry.body} onClickTag={onClickTag} />
    <time className="f6 db gray">{formatDate(entry.date)}</time>
  </EntryContainer>
);
Entry.propTypes = {
  entry: t.object,
  onClickTag: t.function
};

const Loader = () => <p className="code gray">Loading…</p>;
const Empty = () => (
  <p className="code gray">No entries to show. Try a different search.</p>
);

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
    <section className="mw7 center sans-serif">
      <h2 className="avenir fw4 ph3 ph0-l">
        <a className="no-underline black dim" href="/">
          {title || "JRNL"}
        </a>
      </h2>
      <input onChange={onInputChange} value={filter} />
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
    console.log("clicked tag");
    console.log(tag);
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
