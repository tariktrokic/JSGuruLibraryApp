import axios from 'axios';

export default class AuthForm {
    constructor(authInfo) {
        this.authInfo = authInfo;
    };

    async catchAsync(method,route,data) {
        let result;
        try {
            if (data) {
                result = await axios[method](route,data);
            } else {
                result = await axios[method](route);
            };
            return result;
        } catch(e) {
            return e.response;
        };
    };

    async performAuthAction() {
        if (this.authInfo.action === 'login') {
            let loginResult = await this.catchAsync('post','/users/login',{user_name: this.authInfo.username,user_password: this.authInfo.password});
            return loginResult;
        } else {
            let signUpResult = await this.catchAsync('post','/users/signup',{user_name: this.authInfo.username,user_password: this.authInfo.password});
            return signUpResult;
        };
    };
};