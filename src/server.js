import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Switch, Route } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import HomePage from './containers/HomePage';
import MyDreamsPage from './containers/MyDreamsPage';
import AllDreamsPage from './containers/AllDreamsPage';

const app = express();

app.use(express.static('src/static'));

app.use((req, res) => {
    const context = {};
    const store = createStore(reducer, applyMiddleware(thunk));

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
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
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(302, context.url);
    } else {
        res.set('content-type', 'text/html');
        res.send(getHtml(html));
    }
});

function getHtml(componentHTML) {
    return `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="utf-8">
            <title>Dreamdairy frontend</title>
            <link rel="icon" type="image/x-icon" href="favicon.ico" />
            <link href="/css/bootstrap.min.css" rel="stylesheet">
            <link href="/css/font-awesome.min.css" rel="stylesheet">
            <link href="/css/main.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${componentHTML}</div>
            <script src="/js/bundle.js"></script>
        </body>
        </html>
    `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});