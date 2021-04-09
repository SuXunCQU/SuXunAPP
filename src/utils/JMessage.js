import JMessage from "jmessage-react-plugin";
import Toast from "./Toast";
import {JGAPPKEY} from "./costant";

export default {
    // 初始化
    init() {
        console.log('JMessage.int');
        return new Promise((resolve, reject) => {
            JMessage.init({
                'appkey': JGAPPKEY,
                'isOpenMessageRoaming': true,  // 是否漫游消息
                'isProduction': false,
                'channel': ''
            }, resolve, reject)
        })
        // JMessage.init({
        //   'appkey': '4bf5e4c1f3852e600dd072f0',
        //   'isOpenMessageRoaming': true,  // 是否漫游消息
        //   'isProduction': false,
        //   'channel': ''
        // })
    },
    // 注册
    register(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.register({
                username,
                password
            }, resolve, reject)
        })
    },
    // 登录
    login(username, password) {
        return new Promise((resolve, reject) => {
            JMessage.login({
                username,
                password
            }, resolve, reject)
        })
    },

    /**
     * 极光-发送文本消息
     * @param {String} username 要接收信息的对象 收件人
     * @param {String} text 文本内容
     * @param {Object} extras 要附带的参数
     */
    sendTextMessage(username, text, extras = {}) {
        return new Promise((resolve, reject) => {
            // 消息的类型 单个 即可
            const type = "single";
            JMessage.sendTextMessage({
                    type, username,
                    text, extras
                },
                resolve, reject)
        })
    },

    /**
     * 创建群组
     * 存储返回的groupId到后端数据库
     * @param taskName
     * @param taskId
     * @returns {Promise<unknown>}
     */
    creatGroup(taskName, taskId) {
        return new Promise((resolve, reject) => {
            JMessage.createGroup({name: taskName, groupType: 'public', desc: '任务ID：'},
                (groupId) => {  // groupId: 新创建的群组 ID
                    // do something.
                    console.log('success');

                }, resolve('1'), reject('2'))
        })
    },

    /**
     * 获取群组信息
     * @param groupId
     * @returns {Promise<unknown>}
     */
    getGroupInfo(groupId) {
        return new Promise((resolve, reject) => {
            JMessage.getGroupInfo(
                {id: groupId + ""},
                (result) => {
                    /**
                     * result {Object} 群组信息
                     {
                      desc:""
                      id:"1234567"
                      isBlocked:false
                      isNoDisturb:false
                      level:0
                      maxMemberCount:500
                      name:"China no 1"
                      owner:"1234"
                      ownerAppKey:"abcdef..."
                      type:"group" // or single
                      }
                     */
                }, resolve, reject)
        })
    },


    /**
     * 批量添加成员，加入任务时调用
     * @param id
     * @param usernameArray
     * @returns {Promise<unknown>}
     */
    addGroupMembers(groupId,usernameArray) {
        return new Promise((resolve, reject) => {
            JMessage.addGroupAdmins({id: 'group_id', usernameArray: ['ex_username1', 'ex_username2'], appKey: JGAPPKEY},
                () => {  //
                    // do something.

                }, (error) => {
                    let code = error.code
                    let desc = error.description
                })
        })
    },


    /**
     * 批量删除队员
     * 退出任务时调用
     * @param groupId
     * @param usernameArray
     * @returns {Promise<unknown>}
     */
    removeGroupMembers(groupId,usernameArray){
      return new Promise((resolve,reject)=>{
          JMessage.removeGroupMembers({ id: 'group_id', usernameArray: ['ex_username1', 'ex_username2'], appKey: JGAPPKEY },
              () => {  //
                  // do something.

              }, (error) => {
                  let code = error.code
                  let desc = error.description
              })
      })
    },

    /**
     * 获取历史消息
     * @param {String} username 要获取和谁的聊天记录
     * @param {Number} from 从第几条开始获取
     * @param {Number} limit 一共要获取几条
     * 参数说明
     type: 会话类型。可以为 'single' 或 'group'。
     username: 对方用户的用户名。当 type 为 'single' 时，username 为必填。
     appKey: 对方用户所属应用的 AppKey。如果不填，默认为当前应用。
     groupId: 对象群组 id。当 type 为 'group' 时，groupId 为必填。
     from: 第一条消息对应的下标，起始为 0。
     limit: 消息数。当 from = 0 并且 limit = -1 时，返回所有的历史消息。
     isDescend: 是否降序（消息时间戳从大到小排序），默认为 false。
     */
    getHistoryMessages(username, from, limit) {
        return new Promise((resolve, reject) => {
            JMessage.getHistoryMessages({
                    type: 'single', username,
                    from, limit
                },
                resolve, reject)
        })
    },
    /**
     * 发送图片消息
     * @param {String} username 接受者的用户名
     * @param {String} path 图片的路径
     * @param {Object} extras 附带额外的数据
     */
    sendImageMessage(username, path, extras = {}) {
        return new Promise((resolve, reject) => {
            JMessage.sendImageMessage({
                    type: 'single', username,
                    path, extras
                },
                resolve, reject)
        })
    },
    /**
     * 获取当前登录用户的未读消息
     */
    getConversations() {
        Toast.showLoading("获取中");
        return new Promise((resolve, reject) => {
            JMessage.getConversations(res => {
                Toast.hideLoading();
                resolve(res);
            }, reject);
        })
    },
    /**
     * 执行极光的退出
     */
    logout: JMessage.logout


}
