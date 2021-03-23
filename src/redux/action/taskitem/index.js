import Types from '../types';

/**
 * 切换了默认任务
 * @param task_id
 * @returns {{task_id, type: string}}
 */
export function onMainTaskChange(task_id){
    return {type: Types.MAINTASK_CHANGE, task_id};
}

export function onMainTaskDetailChange(item){
    return {type: Types.MAINTASK_DETAIL_CHANGE, item};
}
