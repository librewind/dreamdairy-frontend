import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as DreamActions from '../actions/DreamActions';
import DreamList from '../components/DreamList';
import Loading from '../components/Loading';

class AllDreamsPage extends Component {
    componentDidMount() {
        const {actions} = this.props;

        actions.apiGetDreams(1);
    }

    render () {
        const {dreams, actions} = this.props;

        return (
            <div>
                <DreamList dreams={dreams.list.items} selected_dreams={dreams.list.selected_items}
                           total_pages={dreams.list.total_pages} total_items={dreams.list.total_items}
                           current_page={dreams.list.current_page} loading={dreams.loading} actions={actions}/>
                {
                    dreams.loading
                    ? <Loading />
                    : false
                }
            </div>
        );
    }
}

function mapState(state) {
    return {
        dreams: state.dreams
    };
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(DreamActions, dispatch)
    };
}

export default withRouter(connect(mapState, mapDispatch)(AllDreamsPage));