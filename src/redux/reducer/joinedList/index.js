import Types from '../../action/types'

const defaultState = {};
/**
 * State Tree:
 * joinedList:{
 *      items: [],
 *      isLoading: false
 * }
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function onAction(state=defaultState, action){
    switch(action.type){
        case Types.JOINEDLIST_SET:
            return{
                ...state,
                items: action.joinList,
            }
        case Types.JOINEDLIST_REFRESH_SUCCESS:
            return {
                ...state,
                items: action.items,
                isLoading: false
            };
        case Types.JOINEDLIST_REFRESH_FAILED:
            return {
                ...state,
                isLoading: false
            };
        case Types.JOINEDLIST_REFRESH:
            return {
                ...state,
                isLoading: true
            };
        case Types.JOINEDLIST_ADD:
            return {
                ...state,
                item: action.item,
            }
        default:
            return state;
    }
}
