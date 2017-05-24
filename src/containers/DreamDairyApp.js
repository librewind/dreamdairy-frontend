import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import * as FriendsActions from '../actions/FriendsActions';
//import { FriendList, AddFriendInput } from '../components';

/*@connect(state => ({
    friendlist: state.friendlist
}))*/
export default class DreamDairyApp extends Component {

    /*static propTypes = {
        friendsById: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }*/

    render () {
        //const { friendlist: { friendsById }, dispatch } = this.props;
        //const actions = bindActionCreators(FriendsActions, dispatch);

        return (
            <div>
                <h1>Dream Dairy</h1>
            </div>
        );
    }
}