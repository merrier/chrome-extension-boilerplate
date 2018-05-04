import React, {Component} from 'react';
import './index.less';

class PopupDetail extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='popup-detail'>
                <p>Component PopupDetail</p>
                <p>You can find me at src/components/PopupDetail</p>
            </div>
        )
    }
}

export default PopupDetail;