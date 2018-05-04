import React, {Component} from 'react';
import './index.less';

class PopupHome extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='popup-home'>
                <p>Component PopupHome</p>
                <p>You can find me at src/components/PopupHome</p>
            </div>
        );
    }
}

export default PopupHome;