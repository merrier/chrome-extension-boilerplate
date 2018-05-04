import React, {Component} from "react";
import { render } from "react-dom";

class Background extends Component{
    render () {
        return (
            <div>Hello, find me on src/containers/Background.js</div>
        )
    }
}

render(
  <Background />,
  document.getElementById("main")
);