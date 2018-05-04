import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "containers/App";
import PopupHome from "components/PopupHome";
import PopupDetail from "components/PopupDetail";

class Popup extends Component {
  render() {
    return (
        <App>
            <PopupHome />
            <PopupDetail />
        </App>
    );
  }
}

render(<Popup />, document.getElementById("main"));
