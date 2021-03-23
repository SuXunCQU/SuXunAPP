import {action, makeObservable, observable} from "mobx";

class UserStore {

    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,
            clear: action,
        })
    }

    user = {
        "Distance": 0,
        "address": "广州市天河区珠吉路58号",
        "age": 23,
        "amount": null,
        "birthday": "1995-03-07T16:00:00.000Z",
        "city": "广州",
        "email": null,
        "gender": "男",
        "guid": null,
        "header": "/upload/18665711978.png",
        "id": 7,
        "lat": 23.12933,
        "lng": 113.42782,
        "login_time": "2020-06-10T10:57:34.000Z",
        "marry": "单身",
        "mobile": "18665711978",
        "nick_name": "一叶知秋",
        "status": 0,
        "vcode": "888888",
        "xueli": "本科"
    };

    setUser(user) {
        this.user = user;
    }

    // 清除用户信息
    clearUser() {
        this.user = {};
    }
}

export default new UserStore();
