import RestApi from '../myLib/connect';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, ROTATION } from './actionTypes';
const api = RestApi('https://hybc.jroslaniec.com:8000');

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({
            type: AUTH_LOGIN
        });
        api
            .login(username, password)
            .then(response => response.json())
            .then(({ token }) => token.split('-').pop())
            .then(token => dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: token
            }));
    };
};

export const rotation = (angledegree) =>{
    console.log("++++++ROTAT" , angledegree);
    return  {
        type: ROTATION,
        deg: angledegree
    };
}