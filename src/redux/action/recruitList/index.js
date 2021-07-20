import Types from '../types';
import {reqTasksnIncidents} from "../../../api";

/**
 * 异步action
 * 获取招募中的任务列表
 * @returns {(function(*): Promise<void>)|*}
 */
export function onLoadRecruitListData(){
    return async (dispatch) => {
        const response = await reqTasksnIncidents();
        console.log(response);
        if (response.status === 0) {
            console.log("招募中列表请求成功");
            dispatch(onSetRecruitListData(response.result));
        }
    }
}

/**
 * 同步action
 * 将招募中的任务列表设置到state中
 * @param data
 * @returns {{recruitList, type: string}}
 */
export function onSetRecruitListData(data){
    return {type: Types.RECRUITLIST_SET, recruitList: data};
}
