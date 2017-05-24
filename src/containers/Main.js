import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import HomePage from './HomePage';
import MyDreamsPage from './MyDreamsPage';
import AllDreamsPage from './AllDreamsPage';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/dreams" component={MyDreamsPage} />
                <Route exact path="/dreams/all" component={AllDreamsPage} />
            </Switch>
        );
    }
}