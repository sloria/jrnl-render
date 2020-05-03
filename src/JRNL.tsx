// @ts-ignore
import parse from "jrnl-parse";
import React from "react";
import { IEntry } from "./constants";
import Entry from "./Entry";
import Markdown from "./Markdown";
import { slugifyEntry } from "./utils";

const Empty = (props: { children?: React.ReactNode }) => (
  <div className="Empty tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    {props.children}
  </div>
);

const Loader = ({ message }: { message: string }) => (
  <div className="Loader tc mt5 mh5 mt6-l mh6-l code gray vh-75">
    <Markdown source={message || "Loading entries…"} simple={true} />
  </div>
);

const SearchInput = (props: React.InputHTMLAttributes<any>) => (
  <input
    className="Search code f7 input-reset pa2 br2 ba b--black-20 bg-white hover-dark-blue"
    {...props}
  />
);

const Footer = ({ copyright }: { copyright: string }) => (
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

interface IHeaderProps {
  title: string;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  filter: string;
}
const Header = ({ title, onInputChange, filter }: IHeaderProps) => (
  <header className="Header flex mt4 mb3 mw8 center">
    <h2 className="Header-brand f4 mv0 pv2 ph3 ph0-l">
      <a className="no-underline hover-dark-pink near-black" href="/">
        {title || "JRNL"}
      </a>
    </h2>
    <div className="flex-auto" />
    <div className="Header-search tc lh-title flex mb1">
      <SearchInput
        autoFocus={true}
        placeholder="Search..."
        onChange={onInputChange}
        value={filter}
      />
    </div>
  </header>
);

export interface IJRNLProps {
  title: string | null;
  source: string;
  loaded: boolean | null;
  filter: string;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onClickTag: (tag: string) => void;
  copyright: string | null;
  loadingMessage: string | null;
}
const JRNL = ({
  title,
  source,
  loaded,
  loadingMessage,
  copyright,
  filter,
  onInputChange,
  onClickTag
}: IJRNLProps) => {
  const parsed = source ? parse(source) : [];
  // Show entries in reverse chronological order
  let entries = parsed.reverse();
  // Add slug field to each entry
  entries.forEach((entry: IEntry) => {
    entry.slug = slugifyEntry(entry);
  });
  if (filter) {
    // Naive search. If all tokens are in the
    // title+body, it's a hit
    const entryFilter = (entry: IEntry) => {
      const filterTokens = filter.split(/\s+/);
      const entryLower = `${entry.title}\n${entry.body}`.toLowerCase();
      for (const token of filterTokens) {
        if (entryLower.indexOf(token) < 0) {
          return false;
        }
      }
      return true;
    };
    entries = entries.filter(entryFilter);
  }
  return (
    <div className="App mw7 center sans-serif near-black">
      <Header
        title={title || ""}
        onInputChange={onInputChange}
        filter={filter}
      />
      <section className="min-vh-75">
        {loaded === false ? (
          <Loader message={loadingMessage || ""} />
        ) : loaded === null ? (
          <Empty />
        ) : entries.length ? (
          entries.map((entry: IEntry) => (
            <Entry key={entry.slug} entry={entry} onClickTag={onClickTag} />
          ))
        ) : (
          <Empty>
            <p>No entries to show. Try a different search.</p>
          </Empty>
        )}
      </section>
      <Footer copyright={copyright || ""} />
    </div>
  );
};
JRNL.defaultProps = {
  loaded: true
};

export default JRNL;
