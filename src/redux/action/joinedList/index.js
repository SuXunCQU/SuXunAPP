import Types from '../types';
import DataStore from '../../../expand/dao/DataStore';
import joinedData from '../../../res/data/data.json';
import {reqAddTaskMember, reqJoinedTask} from "../../../api";
/**
 * 获取已加入任务列表数据的异步action
 * @param storeName
 * @param url
 * @returns {Function}
 */
export function onLoadJoinedListData(url, pageSize){
    return async (dispatch) => {
        const response = await reqJoinedTask();
        console.log(response);
        if(response.status === 0){

        }
    }

    // TODO 旧版代码，dataStore部分后续可重新利用
    // return (dispatch) => {
    //     dispatch({type: Types.JOINEDLIST_REFRESH});
    //     try{
    //         if(!joinedData){
    //             throw new Error("Load joinedData failed.")
    //         }
    //         handleData(dispatch, joinedData, pageSize);
    //     } catch(error){
    //         console.log(error.toString());
    //         dispatch({
    //             type: Types.JOINEDLIST_REFRESH_FAILED,
    //             error
    //         })
    //     }
    //     // 因为离线测试的原因，先不用下面的代码
    //     // let dataStore = new DataStore();
    //     // dataStore.fetchData(url) // 异步action与数据流
    //     //     .then((data) => {
    //     //         handleData(dispatch, data);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error.toString());
    //     //         dispatch({
    //     //             type: Types.JOINEDLIST_REFRESH_FAILED,
    //     //             error
    //     //         })
    //     //     })
    // }
}

export function onAddMemberToTask(member_id, task){
    return async (dispatch) => {
        const response = await reqAddTaskMember(task.task_id, member_id);
        console.log(response);
        if(response.status === 0){
            dispatch(onAddJoinListItem(task));
        }
    }
}

/**
 * 同步action
 * 添加 task 到 joinList 里面
 * @param item
 * @returns {{item, type: string}}
 */
export function onAddJoinListItem(item){
    return {type: Types.JOINEDLIST_ADD, item: item};
}

export function onSetJoinListData(data){
    return {type: Types.JOINEDLIST_SET, joinList: data};
}

function handleData(dispatch, data, pageSize) {
    dispatch({
        type: Types.JOINEDLIST_REFRESH_SUCCESS,
        items: data, // 这个items是取得的json数据里的键名
    })
}
