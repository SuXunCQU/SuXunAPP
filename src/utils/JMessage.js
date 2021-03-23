import JMessage from "jmessage-react-plugin";

export default {
  // 初始化
  init() {
    const res = JMessage.init({
      "appkey": "4bf5e4c1f3852e600dd072f0",
      "isOpenMessageRoaming": true, // 是否开启消息漫游，默认不开启
      "isProduction": false,  // 是否为生产模式，应用上线后改为true(即上线后为生产模式)
      "channel": "",
    });
    console.log("J.init", res);
  },

  // 注册
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register({
        username,
        password,
      }, resolve, reject);
    });
  },

  // 登录
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login({
        username,
        password,
      }, resolve, reject);
    });
  },

  /**
   * 获取历史消息
   * @param groupId 对象群组 id
   * @param from 从第几条开始获取
   * @param limit 一共要获取几条
   * @returns {Promise<unknown>}
   */
  getHistoryMessages(groupId,from,limit) {
    return new Promise((resolve, reject) => {
      JMessage.getHistoryMessages({
        type: "group",
        groupId,
        from,
        limit,
      }, resolve, reject);
    });
  },
};
