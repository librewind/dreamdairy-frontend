import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './containers/App';

let store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);