import * as React from "react";

import fetchTxt from "./fetch-txt";
import getQueryParam from "./get-query-param";
import JRNL from "./JRNL";
import { delayedLoader } from "./utils";

interface IAppProps {
  url: string;
  source: string | null;
  title: string | null;
  copyright: string | null;
  loadingMessage: string | null;
}
interface IAppState {
  loaded: boolean | null;
  source: string;
  filter: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      // TODO: Error state
      filter: "",
      loaded: null,
      source: ""
    };
  }
  public componentDidMount() {
    const filter = getQueryParam("q") || "";
    // Try to guess if a URL was passed
    if (this.props.url) {
      this.setState({ filter });
      const fetchPromise = fetchTxt(this.props.url).then(source => {
        this.setState({ source, loaded: true }, () => {
          if (window.location.hash) {
            // setTimeout ensures that entries are fully
            // rendered before scrolling to the entry
            window.setTimeout(() => {
              const id = window.location.hash.slice(1);
              const elem = document.getElementById(id);
              if (elem) {
                elem.scrollIntoView(true);
              }
            }, 100);
          }
        });
      });
      // Don't show loading indicator if the request finishes
      // in < 300ms
      delayedLoader(fetchPromise, () => this.setState({ loaded: false }), 300);
    } else if (this.props.source) {
      this.setState({ source: this.props.source });
    }
  }
  public render() {
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
  private handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ filter: e.currentTarget.value });
  };
  private handleClickTag = (tag: string) => {
    this.setState({ filter: tag });
  };
}
export default App;
