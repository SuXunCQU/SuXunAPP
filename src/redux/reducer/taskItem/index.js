import Types from '../../action/types'

const defaultState = {
    task_id: -1,
    detailItem: null,
};

/**
 * State Tree
 * taskItem:{
 *     task_id: Number,
 *     detailItem: Object,
 * }
 * @param state
 * @param action
 * @returns {{}|{task_id: *}}
 */
export default function onAction(state=defaultState, action){
    switch(action.type){
        case Types.MAINTASK_CHANGE:
            return{
                ...state,
                task_id: action.task_id,
            };
        case Types.MAINTASK_DETAIL_CHANGE:
            return{
                ...state,
                detailItem: action.item,
            }
        default:
            return state;
    }
}
