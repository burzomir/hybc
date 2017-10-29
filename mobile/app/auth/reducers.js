import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, ROTATION } from './actionTypes';

export default (state = { token: '', isLogging: false, deg: 0 }, action) => {
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
        case ROTATION:{
            console.log("Rotasdf");
            return {
                ...state,
                deg: action.deg
            }
        }
        default:
            return state;
    }
};