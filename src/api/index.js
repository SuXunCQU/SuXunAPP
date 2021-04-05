/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import request from "./request";


/**
 * 账户
 */
// 登录
export const reqLogin = (username, password) => request.post('/auth_token/signin/', {username, password});

/**
 * 线索
 */
// 新建线索
export const reqAddClue = (task_id, member_id, required, text, photo, video, pos, create_time) =>
    request.post('/clue/', {
        task_id, member_id, required, text, photo, video, pos, create_time
    });

// 关键字检索线索
export const reqQueryClueByKey = (task_id, member_id, text, photo, video, pos, create_time) =>
    request.post('/clue/query_by_key/', {
        task_id, member_id, text, photo, video, pos, create_time
    });

// 通过id查看线索详情
export const reqReadClue = (id) => request.get(`/clue/${id}/`);

// 修改线索
export const reqUpdateClue = (id, task_id, member_id, text, photo, video, pos, create_time) =>
    request.put(`/clue/${id}/`, {task_id, member_id, text, photo, video, pos, create_time});

// 部分修改线索
export const reqPartialUpdateClue = (id, task_id, member_id, text, photo, video, pos, create_time) =>
    request.put(`/clue/${id}/`, {task_id, member_id, text, photo, video, pos, create_time});

// 删除线索
export const reqDeleteClue = (id) => request.delete(`/clue/${id}/`);

/**
 * 退出任务
 */
// 创建退出任务申请
export const reqCreateExitTask = (task_id, member_id, reason) => request.post('/exit-task/', {
    task_id,
    member_id,
    reason
});

// 通过id查看退出任务申请
export const reqReadExitTask = (id) => request.get(`/exit-task/${id}/`);

// 修改退出任务申请
export const reqUpdateExitTask = (id, task_id, member_id, reason) => request.put(`/exit-task/${id}/`, {
    task_id,
    member_id,
    reason
});

// 部分修改退出任务申请
export const reqPartialUpdate = (id, task_id, member_id, reason) => request.patch(`/exit-task/${id}/`, {
    task_id,
    member_id,
    reason
});

// 删除退出任务申请
export const reqDeleteExitUpdate = (id) => request.delete(`/exit-task/${id}/`);

/**
 * 人脸识别
 */
// 拍照人脸识别
export const reqFaceMatch = (photo) => request.post('/face-recognition/match_pair/', {photo});

/**
 * 任务完成
 */
// 创建任务完成申请
export const reqCreatFinishTask = (task_id, member_id, confirm_photo, group_photo, pos, creat_time) => request.post('/finish-task/', {
    task_id,
    member_id,
    confirm_photo,
    group_photo,
    pos,
    creat_time
});

// 通过id查看任务完成申请
export const reqReadFinishTask = (id) => request.get(`/finish-task/${id}/`);

// 修改任务完成申请
export const reqUpdateFinishTask = (id, task_id, member_id, confirm_id, group_info, pos, creat_time) => request.put(`/finish-task/${id}/`, {
    task_id,
    member_id,
    confirm_id,
    group_info,
    pos,
    creat_time
});

// 部分修改任务完成申请
export const reqPartialUpdateFinishTask = (id, task_id, member_id, confirm_id, group_info, pos, creat_time) => request.patch(`/finish-task/${id}/`, {
    task_id,
    member_id,
    confirm_id,
    group_info,
    pos,
    creat_time
});

// 删除任务完成申请
export const reqDeleteFinishTask = (id) => request.delete(`/finish-task/${id}/`);

/**
 * 走失者信息
 */
// 创建走失者信息
export const reqCreateLost = (name, gender, id_number, age, is_ill, ill_situation, lost_time, lost_place, description, lost_photo, lost_video,
                              reporter_name, reporter_gender, reporter_id_number, reporter_age, reporter_id_photo, relation, reporter_address, reporter_phone, reporter_wechat, is_finding, create_time) =>
    request.post('/lost/', {
        name,
        gender,
        id_number,
        age,
        is_ill,
        ill_situation,
        lost_time,
        lost_place,
        description,
        lost_photo,
        lost_video,
        reporter_name,
        reporter_gender,
        reporter_id_number,
        reporter_age,
        reporter_id_photo,
        relation,
        reporter_address,
        reporter_phone,
        reporter_wechat,
        is_finding,
        create_time
    });

// 关键字搜索走失者信息
export const reqQueryLostByKey = (name, id_number, reporter_name, reporter_phone, reporter_id_number) =>
    request.post('/lost/query_by_key/', {name, id_number, reporter_name, reporter_phone, reporter_id_number});

// 通过id查看走失者信息
export const reqReadLost = (id) => request.get(`/lost/${id}/`);

// 修改走失者信息
export const reqUpdateLost = (id, name, gender, id_number, age, is_ill, ill_situation, lost_time, lost_place, description, lost_photo, lost_video,
                              reporter_name, reporter_gender, reporter_id_number, reporter_age, reporter_id_photo, relation, reporter_address, reporter_phone, reporter_wechat, is_finding, create_time) =>
    request.put(`/lost/${id}/`, {
        name,
        gender,
        id_number,
        age,
        is_ill,
        ill_situation,
        lost_time,
        lost_place,
        description,
        lost_photo,
        lost_video,
        reporter_name,
        reporter_gender,
        reporter_id_number,
        reporter_age,
        reporter_id_photo,
        relation,
        reporter_address,
        reporter_phone,
        reporter_wechat,
        is_finding,
        create_time
    })

// 部分修改走失者信息
export const reqPartialUpdateLost = (id, name, gender, id_number, age, is_ill, ill_situation, lost_time, lost_place, description, lost_photo, lost_video,
                                     reporter_name, reporter_gender, reporter_id_number, reporter_age, reporter_id_photo, relation, reporter_address, reporter_phone, reporter_wechat, is_finding, create_time) =>
    request.patch(`/lost/${id}/`, {
        name,
        gender,
        id_number,
        age,
        is_ill,
        ill_situation,
        lost_time,
        lost_place,
        description,
        lost_photo,
        lost_video,
        reporter_name,
        reporter_gender,
        reporter_id_number,
        reporter_age,
        reporter_id_photo,
        relation,
        reporter_address,
        reporter_phone,
        reporter_wechat,
        is_finding,
        create_time
    })

// 删除走失者信息
export const reqDeleteLost = (id) => request.delete(`/lost/${id}/`);

/**
 * 队员
 */
// 创建队员
export const reqCreatMember = (username, password, name, gender, age, id_number, address, current_pos, phone, wechat, specialty, transportation, equipment, photo, id_photo, is_manager, is_work, join_time) =>
    request.post('/member/', {
        username,
        password,
        name,
        gender,
        age,
        id_number,
        address,
        current_pos,
        phone,
        wechat,
        specialty,
        transportation,
        equipment,
        photo,
        id_photo,
        is_manager,
        is_work,
        join_time
    });

// 关键字检索队员
export const reqQueryMemberByKey = (name, age, gender, address, is_manager, is_work) =>
    request.post('/member/member_key_read/', {name, age, gender, address, is_manager, is_work});

// 修改密码
export const reqSetMemberPassword = (old_password, new_password) => request.post('/member/set_password/', {
    old_password,
    new_password
});

// 通过队员id查看队员信息
export const reqReadMember = (id) => request.get(`/member/${id}/`);

// 修改队员信息
export const reqUpdateMember = (id, username, password, name, gender, age, id_number, address, current_pos, phone, wechat, specialty, transportation, equipment, photo, id_photo, is_manager, is_work, join_time) =>
    request.post(`/member/${id}/`, {
        username,
        password,
        name,
        gender,
        age,
        id_number,
        address,
        current_pos,
        phone,
        wechat,
        specialty,
        transportation,
        equipment,
        photo,
        id_photo,
        is_manager,
        is_work,
        join_time
    });

// 部分修改队员信息
export const reqPartialUpdateMember = (id, username, password, name, gender, age, id_number, address, current_pos, phone, wechat, specialty, transportation, equipment, photo, id_photo, is_manager, is_work, join_time) =>
    request.patch(`/member/${id}/`, {
        username,
        password,
        name,
        gender,
        age,
        id_number,
        address,
        current_pos,
        phone,
        wechat,
        specialty,
        transportation,
        equipment,
        photo,
        id_photo,
        is_manager,
        is_work,
        join_time
    });

// 删除队员
export const reqDeleteMember = (id) => request.delete(`/member/${id}/`);

/**
 * 任务-队员关联
 */
// 新增任务队员
export const reqAddTaskMember = (group_id, task_id, member_id) => request.post('/member-task/', {
    group_id,
    task_id,
    member_id
});

// 删除任务队员
export const reqDeleteTaskMember = (task_id, member_id) => request.post('/member-task/delete_member/', {
    task_id,
    member_id
});

// 退出任务审批
export const reqExitTaskJudge = (is_agree, task_id, member_id) =>
    request.post('/member-task/exit_judge/', {is_agree, task_id, member_id});

// 关键字检索任务队员
export const reqQueryTaskMemberByKey = (name, age, gender, address, is_manager, is_work, task_id) =>
    request.post('/member-task/query_by_key/', {name, age, gender, address, is_manager, is_work, task_id});

// 通过id查看任务队员
export const reqReadTaskMember = (id) =>
    request.get(`/member-task/${id}/`);

/**
 * 暂缓任务
 */
// 创建暂缓任务申请
export const reqCreatePauseTask = (task_id, member_id, reason, creat_time) =>
    request.post('/pause-task/', {task_id, member_id, reason, creat_time});

// 通过id查看暂缓任务申请
export const reqReadPauseTask = (id) =>
    request.get(`/pause-task/${id}/`);

// 修改暂缓任务申请
export const reqUpdatePauseTask = (id, task_id, member_id, reason, creat_time) =>
    request.put('/pause-task/{id}/', {id, task_id, member_id, reason, creat_time});

// 部分修改暂缓任务申请
export const reqPartialUpdatePauseTask = (id, task_id, member_id, reason, creat_time) =>
    request.patch('/pause-task/{id}/', {id, task_id, member_id, reason, creat_time});

// 删除暂缓任务申请
export const reqDeletePauseTask = (id) =>
    request.delete(`/pause-task/${id}/`);

/**
 * 数据统计
 */
// 统计走失者年龄
export const reqCountByAge = (begin_time, end_time) =>
    request.post('/summary/count_by_age/', {begin_time, end_time})

// 统计走失地点
export const reqCountByPlace = (begin_time, end_time, place) =>
    request.post('/summary/count_by_place/', {begin_time, end_time, place});

// 当前队员出勤状态统计
export const reqMemberActiveSummary = () =>
    request.get('/summary/member_active_summary/');

// 某年参与救助人员数量统计
export const reqMemberHistorySummary = (year) =>
    request.post('/summary/member_history_summary/', {year});

// 某年某月任务完成情况统计
export const reqTaskSummary = (year, month) =>
    request.post('/summary/task_summary/', {year, month});

/**
 * 任务
 */
// 创建任务
export const reqCreateTask = (lost_id, start_time, end_time, state, rank, more) =>
    request.post('/task/', {lost_id, start_time, end_time, state, rank, more});

// 关键字检索任务
export const reqQueryTaskByKey = (start_time, end_time, state, rank) =>
    request.post('/task/query_by_key/', {start_time, end_time, state, rank});

// 任务分发
export const reqTaskDispatch = (reporter_place, rank) =>
    request.post('/task/task_dispatch/', {reporter_place, rank});

// 通过id获取任务
export const reqReadTask = (id) =>
    request.get(`/task/${id}/`);

// 修改任务
export const reqUpdate = (id, lost_id, start_time, end_time, state, rank, more) =>
    request.put(`/task/${id}/`, {lost_id, start_time, end_time, state, rank, more});

// 删除任务
export const reqDeleteTask = (id) => request.delete(`/task/${id}/`);

/**
 * 上传
 */
// 上传文件
export const reqUpload = (name, file, creat_time) =>
    request.post('/upload/', {name, file, creat_time});

/**
 * 验证码
 */
// 请求发送验证码
export const reqSendCode = (phone) =>
    request.post('/verification-code/send_code/', {phone});

// 找回密码
export const reqFoundPassword = (phone, code, new_password) =>
    request.post('/verification-code/found_password/', {phone, code, new_password});
