'use strict';


// User Info는 꼭 userInfo/index.js를 통해서 접근해주세요.

const UserInfoSchema = {
    name: "UserInfo",
    properties: {
        idx: { type: 'int', default: 0 }
    }
}

class UserInfo {
    get isLogin() {
        return this.idx == 0 ? false : true;
    }
}

UserInfo.schema = UserInfoSchema;

module.exports = UserInfo;
