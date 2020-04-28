import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signup } from '../actions/accountCreation';
import fetchStates from '../reducers/fetchStates';
import { Link } from 'react-router-dom';

class SignUp extends Component {
    state = { usernameNew: '', passwordNew: '', passwordConfNew: '', email: '', buttonClicked: false };

    createUsername = event => {
        this.setState({ usernameNew: event.target.value });
    }

    createPassword = event => {
        this.setState({ passwordNew: event.target.value });
    }

    createConfPassword = event => {
        this.setState({ passwordConfNew: event.target.value });
    }

    createEmail = event => {
        this.setState({ email: event.target.value });
    }

    createUser = () => {
        this.setState({ buttonClicked: true });
        const { usernameNew, passwordNew, passwordConfNew, email } = this.state;
        this.props.signup({ usernameNew, passwordNew, passwordConfNew, email });
    }

    get Error() {
        if (
            this.state.buttonClicked &&
            this.props.accountCreation.status === fetchStates.error
        ) {
            return <div>{this.props.accountCreation.message}</div>
        } else if (
            this.state.buttonClicked &&
            this.props.accountCreation.status === fetchStates.success
        ) {
            return <div>{this.props.accountCreation.message}</div>
        }
    }

    render() {
        return (
            <div className='signup-page'>
                <h1>Sign Up Page</h1>

                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.usernameNew}
                        placeholder='Username'
                        onChange={this.createUsername} 
                    />
                </FormGroup>
                
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.passwordNew}
                        placeholder='Password'
                        onChange={this.createPassword} 
                    />
                </FormGroup>
                
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.passwordConfNew}
                        placeholder='Confirm Password'
                        onChange={this.createConfPassword} 
                    />
                </FormGroup>
               
                <FormGroup>
                    <FormControl
                        type='text'
                        value={this.state.email}
                        placeholder='Email'
                        onChange={this.createEmail} 
                    />
                </FormGroup>
                <div>
                    <Link to='/' className='back-button'><span>Back</span></Link>
                    <button onClick={this.createUser} className='login-button'>Create User</button>
                </div>
                <br />
                {this.Error}
            </div>
        )
    }
}

export default connect(
    ({ accountCreation }) => ({ accountCreation}),
    { signup }
    )(SignUp);