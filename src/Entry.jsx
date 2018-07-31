import React from "react";
import t from "prop-types";

import Markdown from "./Markdown.jsx";
import { IoMdLink as LinkIcon } from "react-icons/io";
import { formatDate } from "./utils";

const EntryBody = ({ body, onClickTag }) => (
  <div className="Entry-body f6 f5-l lh-copy">
    <Markdown
      className="u-markdown"
      source={body}
      tagURL={tag => `?q=@${tag}`}
    />
  </div>
);
EntryBody.propTypes = {
  body: t.string,
  onClickTag: t.func
};

const EntryContainer = ({ slug, date, children }) => (
  <article id={slug} className="Entry bb b--black-10">
    <div className="db pb6 pt5 ph3 ph0-l">
      <div className="flex flex-column flex-row-ns">
        <div className="w-100">{children}</div>
      </div>
    </div>
    <time className="Entry-date f7 code mb2 db ph3 ph0-l">
      <a className="gray no-underline" title={slug} href={`#${slug}`}>
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
      <h1 className="Entry-title f4 f3-l fw7 mt0 lh-title">
        <a className="near-black no-underline" href={`#${entry.slug}`}>
          {entry.title}
        </a>{" "}
        <span className="Permalink silver">
          <LinkIcon style={{ verticalAlign: "middle" }} />
        </span>
      </h1>
      <EntryBody body={entry.body} onClickTag={onClickTag} />
    </EntryContainer>
  );
};
Entry.propTypes = {
  entry: t.object,
  onClickTag: t.func
};

export default Entry;
