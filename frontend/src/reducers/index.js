import { combineReducers } from 'redux';
import account from './account';
import accountInfo from './accountInfo';
import accountCreation from './accountCreation';

export default combineReducers({
    account,
    accountInfo,
    accountCreation
})