import { observable, action, makeObservable } from "mobx";

class RootStore {

   // 必须有
   constructor() {
       makeObservable(this, {
           mobile: observable,
           token:observable,
           userId:observable,
           setUserInfo: action,
       })
   }

  mobile = "";
  token="";
  userId="";

  setUserInfo(mobile,token,userId) {
    this.mobile=mobile;
    this.token=token;
    this.userId=userId;
  }
}

export default new RootStore();
