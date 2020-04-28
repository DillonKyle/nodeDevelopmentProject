import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Login from './Login';

class Root extends Component {
    render() {
        return (
            this.props.account.loggedIn ? <Home /> : <Login />
        )
    }
};

export default connect(
 ({ account }) => ({ account }),
 null   
)(Root);