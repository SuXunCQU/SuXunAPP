import Types from '../../action/types';

export default function onAction(state, action){
    switch(action.type){
        case Types.ADD_NEW_COORDINATE:
            return{
                ...state,
                coordinate: action.coordinate,
            };
        default:
            return state;
    }
}
