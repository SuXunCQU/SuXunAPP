import Types from '../../action/types';

const defaultState = {}

export default function onAction(state = defaultState, action){
    switch (action.type){
        case Types.RECRUITLIST_SET:
            return {
                ...state,
                items: action.recruitList,
            }
        default:
            return state;
    }
}
