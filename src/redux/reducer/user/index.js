import Types from '../../action/types'

const defaultState = {
    username: "",
    password: "",
    token: "",
};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.USER_SET_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case Types.USER_SET_PASSWORD:
            return {
                ...state,
                password: action.password
            };
        case Types.USER_SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}
