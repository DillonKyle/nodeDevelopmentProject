import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { logout } from '../actions/account';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
        return (
            <div>
                <h2 className='h2'>Welcome</h2>
                <div className='account-home-page'>
                    <button onClick={this.props.logout} className='logout-button'>Log Out</button>
                    <Link to='/account-info' className='link-account-info'>Account Info</Link>
                </div>
            </div>
        )
    }
}

export default connect( null, { logout })(Home);