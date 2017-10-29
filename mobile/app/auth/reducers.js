import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS } from './actionTypes';

export default (state = { token: '', isLogging: false }, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLogging: true
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                token: action.payload,
                isLogging: false,
            };
        default:
            return state;
    }
};