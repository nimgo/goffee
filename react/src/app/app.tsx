import * as React from 'react';
import { Hello } from "./components/Hello";

const title: string = "funn11118business";

// 'AppProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class App extends React.Component<{}, undefined> {
  render() {
    return (
      <div>
        <Hello compiler={title} framework="React" />
        <span>root</span>
      </div>
    );
  }
}
