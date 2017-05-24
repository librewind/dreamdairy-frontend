import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import HomePage from './HomePage';
import MyDreamsPage from './MyDreamsPage';
import AllDreamsPage from './AllDreamsPage';

export default class App extends Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="container">
                        <div className="row">
                            <Navbar>
                                <Navbar.Header>
                                    <Navbar.Brand>Dream dairy</Navbar.Brand>
                                </Navbar.Header>
                                <Nav>
                                    <IndexLinkContainer to="/">
                                        <NavItem>Home</NavItem>
                                    </IndexLinkContainer>
                                    <LinkContainer to="/dreams">
                                        <NavItem>My dreams</NavItem>
                                    </LinkContainer>
                                    <LinkContainer to="/dreams/all">
                                        <NavItem>All dreams</NavItem>
                                    </LinkContainer>
                                </Nav>
                            </Navbar>
                        </div>
                        <div className="row">
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/dreams" component={MyDreamsPage} />
                                <Route exact path="/dreams/all" component={AllDreamsPage} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}