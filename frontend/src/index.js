import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import rootReducers from './reducers';
import { fetchAuthenticated } from './actions/account';
import thunk from 'redux-thunk';
import Root from './components/Root';
import history from './history';
import AccountInfo from './components/AccountInfo';

import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import SignUp from './components/SignUp';

const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const AuthRoute = props => {
    if (!store.getState().account.loggedIn) {
        return < Redirect to={{ pathname: '/' }} />
    }

    const { component, path } = props;

    return <Route path={path} component={component} />;
}

store.dispatch(fetchAuthenticated())
    .then(()=> {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Root} />
                        <AuthRoute path='/account-info' component={AccountInfo} />
                        <Route exact path='/signup' component={SignUp} />
                    </Switch>
                </Router>
            </Provider>,
            document.getElementById('root')
        );
    });

