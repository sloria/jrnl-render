import React from "react";

// TODO: Get react-icons imports working again
// import { IoMdLink as LinkIcon } from "react-icons/io";
import { IEntry } from "./constants";
import Markdown from "./Markdown";
import { formatDate } from "./utils";

const EntryBody = (props: { body: string }) => {
  const renderTag = (tag: string): string => `?q=@${tag}`;
  return (
    <div className="Entry-body f6 f5-l lh-copy">
      <Markdown className="u-markdown" source={props.body} tagURL={renderTag} />
    </div>
  );
};

interface IEntryContainerProps {
  children: React.ReactNode;
  date: Date;
  slug: string;
}
const EntryContainer = ({ slug, date, children }: IEntryContainerProps) => (
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

interface IEntryProps {
  entry: IEntry;
  onClickTag: (tag: string) => void;
}
const Entry = ({ entry }: IEntryProps) => {
  return (
    <EntryContainer slug={entry.slug} date={entry.date}>
      <h1 className="Entry-title f4 f3-l fw7 mt0 lh-title">
        <a className="near-black no-underline" href={`#${entry.slug}`}>
          {entry.title + " "}
          <span className="Permalink silver">
            {/* <LinkIcon style={{ verticalAlign: "middle" }} /> */}
          </span>
        </a>
      </h1>
      <EntryBody body={entry.body} />
    </EntryContainer>
  );
};
export default Entry;
