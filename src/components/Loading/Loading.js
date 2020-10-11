import React, { Component } from 'react';

import './Loading.css';

class Loading extends Component {
    render() {
        return (
            <div className="animation-loader">
                <div className="dot blue"></div>
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
            </div>
        )
    }
}

export default Loading
