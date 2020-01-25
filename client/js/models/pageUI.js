import axios from 'axios'; 

export default class PageUI {
    static async checkIfLoggedIn() {
        let loggedIn = await axios.get('/users/isloggedin');
        delete loggedIn.data.user_password;
        // THIS RETURNS THE USER, NOT A BOOLEAN
        return loggedIn.data;
    };

    static scrollToElement(element) {
        let elementToScrollTo;
        if (element !== 'body') {
            elementToScrollTo = document.querySelector(`.${element}`);
            elementToScrollTo.scrollIntoView({behavior: 'smooth',block: 'end'});
            return;
        };
        elementToScrollTo = document.body;
        elementToScrollTo.scrollIntoView({behavior: 'smooth',block: 'end'});
    };

    static async renderNotificationCount() {
        let notifications = document.querySelector('.notifications');
        let notificationCount = document.querySelector('.notificationcount');
        if (notificationCount) notificationCount.remove();
        let notificationNumber = await axios.get('/books/countnotifications');
        let html = `<p class="notificationcount">${notificationNumber.data}</p>`
        notifications.insertAdjacentHTML('beforeend',html);
    };

    static spreadNotificationArea() {
        document.querySelector('.notificationspread').classList.add('notificationspreadshow');
    };

    static async renderAllAcceptedRequests() {
        let html;
        let display = document.querySelector('.specificnotifications');
        let notificationContainer = document.querySelector('.notificationspread');
        let results = await axios.get('/books/acceptedrequests');
        notificationContainer.onclick = () => {
            this.renderNotificationCount();
            notificationContainer.classList.remove('notificationspreadshow');
            display.innerHTML = '';
        };
        if (results.data.length === 0) {
            html = `<div class="acceptedrequest"><p>You have no notifications</p></div>`;
            display.insertAdjacentHTML('beforeend',html);
            return;
        };
        results.data.forEach((el) => {
            html = `<div class="acceptedrequest"><p>Your request for the book ${el.book_name} has been accepted!</p></div>`;
            display.insertAdjacentHTML('beforeend',html);
        });
        await axios.delete('/books/acceptedrequests');
    };

    static renderMessage(response) {
        this.removeMessage();
        let html;
        let statusCode = response.status + '';
        let display = document.body;
        if (!statusCode.startsWith('4')) {
            html = '<div class="message success"><p>Success!</p></div>';
            display.insertAdjacentHTML('afterbegin',html);
            display.scrollIntoView({behavior: 'smooth',block: 'start'});
            setTimeout(this.removeMessage, 2000);
        } else {
            html = `<div class="message failed"><p>Whoops, something bad happened</p></div>`;
            display.insertAdjacentHTML('afterbegin',html);
            display.scrollIntoView({behavior: 'smooth',block: 'start'});
            setTimeout(this.removeMessage,2000);
        };
    };

    static removeMessage() {
        let message = document.querySelector('.message');
        if (message) {
            message.parentElement.removeChild(message);
        };
    };

    static async fetchAdminControlNecessities(adminControl,makeAdminListItemActive,adminListItemActive) {
        switch (adminControl) {
            case 'addbook': 
            this.loadCategoryDropListItems();
            break;
            case 'editbook':
                this.loadCategoryDropListItems();
                await this.renderAdminListItems('books',['book_id','book_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,this.getBookWithCategory,adminListItemActive);
            break;
            case 'deletebook':
                await this.renderAdminListItems('books',['book_id','book_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,this.getBookWithCategory,adminListItemActive);
            break;
            case 'editcategory':
                await this.renderAdminListItems('categories',['cat_id','cat_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,undefined,adminListItemActive);
            break;
            case 'deletecategory':
                await this.renderAdminListItems('categories',['cat_id','cat_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,undefined,adminListItemActive);
            break;
            case 'edituser':
                await this.renderAdminListItems('users',['user_id','user_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,this.getUserById,adminListItemActive);
            break;
            case 'deleteuser':
                await this.renderAdminListItems('users',['user_id','user_name']);
                this.addAdminListItemActiveListeners(makeAdminListItemActive,this.getUserById,adminListItemActive);
            break;
        };
    };

    static async getBookWithCategory() {
        let bookName = document.querySelector('.active').textContent;
        let result = await axios.get(`/books/withcategory?name=${bookName}`);
        return result;
    };

    static async getUserById() {
        let userId = document.querySelector('.active').dataset.id * 1;
        let result = await axios.get(`/users/${userId}`);
        return result;
    };

    static async loadCategoryDropListItems() {
        let result;
        let html;
        let dropList = document.querySelector('.admincategories');
        result = await axios.get('/categories');
        result.data.forEach(category => {
            html = `<option value="${category.cat_id}">${category.cat_name}</option>`;
            dropList.insertAdjacentHTML('beforeend',html);
        });
    };

    static async renderAdminListItems(route, fields) {
        let result;
        let html;
        let dropList = document.querySelector('.adminlist');
        result = await axios.get(`/${route}`);
        result.data.forEach(item => {
            html = `<h3 class="item" data-id=${item[fields[0]]}>${item[fields[1]]}</h3>`;
            dropList.insertAdjacentHTML('beforeend',html);
        });
    };

    static addAdminListItemActiveListeners(func,dataGetter,dataSetter) {
        let items = document.querySelectorAll('.adminlist .item');
        items.forEach(item => {
            item.addEventListener('click',async(event) => {
                let data;
                func(event);
                if (dataGetter) data = await dataGetter();
                dataSetter(data,this.returnBook);
            });
        });
    };

    static async returnBook(event,book_id) {
        let result = await axios.get(`books/return/${book_id}`);
        PageUI.renderMessage(result);
        if (!((result.status + '').startsWith('4'))) {
            document.querySelector('.button-returnbook').remove();
            document.querySelector('#borroweduser').value = 'Not borrowed';
        };
    };
};

