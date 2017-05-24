import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

export default class HomePage extends Component {
    render () {
        return (
            <div>
                <Panel header="Home">
                    <p>Welcome!</p>
                </Panel>
            </div>
        );
    }
}