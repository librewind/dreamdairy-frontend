import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-overlays';

export default class Loading extends Component {
    render() {
        const container = this.props.container || document.body;

        return (
            <Portal container={container}>
                <div className="modal-backdrop fade in">
                    <div className="fa fa-spin fa-spinner modal-center text-white" style={{fontSize: '400% !important'}} />
                </div>
            </Portal>
        );
    }
}

Loading.propTypes = {
    container: React.PropTypes.any
};

/*Loading.defaultProps = {
    container: document.body
};*/