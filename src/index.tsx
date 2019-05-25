import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./bulma-overrides.sass";
import styled from "styled-components";

class ErrorBoundary extends React.Component<{}, { error: any }> {
  constructor(props: { error: any }) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <hr />
          <code>
            {this.state.error instanceof Error && this.state.error.name}
          </code>
          <hr />
          <code>
            {this.state.error instanceof Error && this.state.error.message}
          </code>
          <hr />
          <code>
            {this.state.error instanceof Error && this.state.error.stack}
          </code>
          <hr />
          <code>{JSON.stringify(this.state.error, undefined, "  ")}</code>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
