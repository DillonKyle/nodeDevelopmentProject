import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { login } from '../actions/account';
import { connect } from 'react-redux';
import fetchStates from '../reducers/fetchStates';
import avatar from '../assets/avatarMale.png';
import { Link } from 'react-router-dom';

class Login extends Component {
    state = { username: '', password: '', buttonClicked: false };

    updateUsername = event => {
        this.setState({ username: event.target.value });
    }

    updatePassword = event => {
        this.setState({ password: event.target.value });
    }

    // signup = () => {
    //     this.setState({ buttonClicked: true });
    //     const { username, password } = this.state;
    //     this.props.signup({ username, password });
    // }

    login = () => {
        this.setState({ buttonClicked: true });
        const { username, password } = this.state;
        this.props.login({ username, password });
        console.log('this.props.login', this.props.login);
    }

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.account.status === fetchStates.error
        ) {
            return <div>{this.props.account.message}</div>
        }
    }

    render() {
        return (
            <div className='login-page'>
                <img src={avatar} width="50%" height="50%" />
                <h2>Login or Create an Account</h2>
                <FormGroup>
                    <FormControl 
                        type='text'
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        type='password'
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                </FormGroup>
                <div>
                    <button onClick={this.login} className='login-button' >Log In</button>
                    <Link to='/signup' className='signup-button'><span>Sign Up</span></Link>
                </div>
                <br />
                {this.Error}
            </div>
        );
    }
}

export default connect(
    ({ account }) => ({ account }), 
    { login }
    )(Login);