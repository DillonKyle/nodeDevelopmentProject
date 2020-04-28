import { ACCOUNT_CREATION } from '../actions/types';
import fetchStates from './fetchStates';

const DEFAULT_ACCOUNT_CREATION = { created: false };

const accountCreation = ( state = DEFAULT_ACCOUNT_CREATION, action ) => {
    switch(action.type) {
        case ACCOUNT_CREATION.FETCH:
            return { ...state, status: fetchStates.fetching };
        case ACCOUNT_CREATION.FETCH_ERROR:
            return { ...state, status: fetchStates.error, message: action.message }
        case ACCOUNT_CREATION.FETCH_SUCCESS:
            return { 
                ...state, 
                status: fetchStates.success, 
                message: action.message,
                created: true
            }
        default:
            return state;
    }
};

export default accountCreation;