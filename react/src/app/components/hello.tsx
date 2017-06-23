import * as React from "react";

import { HelloFunc } from "./hellofunc";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        return (
            <div>
            <span>Hello from {this.props.compiler} and {this.props.framework}!</span>
            <HelloFunc value="spaz" />
            </div>
        );
    }
}
