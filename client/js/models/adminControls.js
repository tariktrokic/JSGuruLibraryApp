import axios from 'axios';

export default class AdminControls {
    constructor(hash) {
        this.hash = hash;
    };

    async catchAsync(method,route,data) {
        try {
            let result;
            if (data) {
                result = await axios[method](route,data);
            } else {
                result = await axios[method](route);
            };
            return result.status;
        } catch(e) {
            return e.response;
        };
    };

    async executeControl(feature,method,data) {
        switch (feature) {
            case 'book':
                let bookResult;
                switch (method) {
                    case 'create':
                        bookResult = this.catchAsync('post',`/books`,data);
                        return bookResult;
                    case 'edit':
                        bookResult = this.catchAsync('patch',`/books/${data.book_id}`,data)
                        return bookResult;
                    case 'delete':
                        bookResult = this.catchAsync('delete',`/books/${data.book_id}`);
                        return bookResult;
                };
            case 'category':
                let categoryResult;
                switch (method) {
                    case 'create':
                        categoryResult = this.catchAsync('post','/categories',data);
                        return categoryResult;
                    case 'edit':
                        categoryResult = this.catchAsync('patch',`/categories/${data.cat_id}`,data);
                        return categoryResult;
                    case 'delete':
                        categoryResult = this.catchAsync('delete',`categories/${data.cat_id}`);
                        return categoryResult;
                };
            case 'user':
                let userResult;
                switch (method) {
                    case 'create':
                        userResult = this.catchAsync('post','/users', data);
                        return userResult;
                    case 'edit':
                        userResult = this.catchAsync('patch',`/users/${data.user_id}`, data);
                        return userResult;
                    case 'delete':
                        userResult = this.catchAsync('delete',`/users/${data.user_id}`);
                        return userResult;
                };
        };
    };

    static hasNullValues(data) {
        return Object.values(data).some(element => element === '');
    };
};
