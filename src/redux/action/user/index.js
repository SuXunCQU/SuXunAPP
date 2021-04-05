import Types from '../types';

export function setUsername(username) {
    return {type: Types.USER_SET_USERNAME, username};
}

export function setPassword(password) {
    return {type: Types.USER_SET_PASSWORD, password};
}

export function setToken(token){
    return {type: Types.USER_SET_TOKEN, token};
}
