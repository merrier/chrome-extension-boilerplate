import React, {Component} from "react";
import { render } from "react-dom";

class Options extends Component{
    render () {
        return (
            <div>Hello, find me on src/containers/Options.js</div>
        )
    }
}

render(
  <Options />,
  document.getElementById("main")
);