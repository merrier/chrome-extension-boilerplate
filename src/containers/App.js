import React, { Component } from 'react';
import 'static/style/app.less';

// You can define some generic components here, such as general header and bottom.
class App extends Component {
    constructor (props, context) {
        super(props, context);
        this.context = context;
    }

    render () {
        const { children } = this.props;
        return (
            <div className="app">
                {children}
            </div>
        )
    }
}

export default App;