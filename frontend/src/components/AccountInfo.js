import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfo';
import { Link } from 'react-router-dom';

class AccountInfo extends Component {
    componentDidMount(){
        this.props.fetchAccountInfo();
    }

    render() {
        return (
            <div className='account-info-page'>
                <h3 className='h3'>Account Info</h3>
                <div>Username: {this.props.accountInfo.username}</div>
                <div>Account ID: {this.props.accountInfo.accountId}</div>
                <hr />
                <Link to='/' className='link'>Home</Link>
            </div>
        )
    }
}

export default connect(
    ({ accountInfo }) => ({ accountInfo }),
    { fetchAccountInfo }
)(AccountInfo);