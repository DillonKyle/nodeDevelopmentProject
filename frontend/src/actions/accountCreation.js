import { fetchFromAccount } from './account';
import { ACCOUNT_CREATION } from './types';

export const signup = ({ usernameNew, passwordNew, passwordConfNew, email }) => fetchFromAccount({
    endpoint: 'signup',
    options: {
        method: 'POST',
        body: JSON.stringify({ usernameNew, passwordNew, passwordConfNew, email }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    },
    FETCH_TYPE: ACCOUNT_CREATION.FETCH,
    ERROR_TYPE: ACCOUNT_CREATION.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_CREATION.FETCH_SUCCESS
});
