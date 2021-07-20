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
        case Types.USER_SET_MEMBER_ID:
            return {
                ...state,
                member_id: action.member_id
            }
        case Types.USER_SET_MEMBER_PHONE:
            return {
                ...state,
                member_phone: action.member_photo
            }
        case Types.USER_SET_MEMBER_PHOTO:
            return {
                ...state,
                member_photo: action.member_photo
            }
        default:
            return state;
    }
}
