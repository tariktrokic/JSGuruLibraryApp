export const clearAdminControls = () => {
    let display = document.querySelector('.admincontrols');
    display.innerHTML = '';
};

export const renderInitial = () => {
    let display = document.querySelector('.admincontrols');
    let html = `<div class="controlbox">
                    <a class="controlbutton bookedit">Edit books</a>
                </div>
                <div class="controlbox">
                    <a class="controlbutton categoryedit">Edit categories</a>
                </div>
                <div class="controlbox">
                    <a class="controlbutton useredit">Edit users</a>
                </div>`;
    display.insertAdjacentHTML('beforeend',html);
};

export const addButtonListenersToInitialControls = () => {
    let bookButton = document.querySelector('.bookedit');
    let categoryButton = document.querySelector('.categoryedit');
    let userButton = document.querySelector('.useredit');
    [[bookButton,'book'],[categoryButton,'category'],[userButton,'user']].forEach((button)=>{button[0].addEventListener('click',() => {renderControls(button[1])})});
};

export const renderControls = (feature) => {
    let display = document.querySelector('.admincontrols');
    clearAdminControls();
    let html = `<div class="controlbox">
                    <a href="#add${feature}" class="controlbutton add${feature}">Add ${feature}</a>
                </div>
                <div class="controlbox">
                    <a href="#edit${feature}" class="controlbutton edit${feature}">Edit ${feature}</a>
                </div>
                <div class="controlbox">
                    <a href="#delete${feature}" class="controlbutton delete${feature}">Delete ${feature}</a>
                </div>
                <div class="controlbox">
                    <a onClick="window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                </div>`
    display.insertAdjacentHTML('beforeend', html);
};

export const renderSpecificControl = (name) => {
    let display = document.querySelector('.admincontrols');
    let html;
    switch (name) {
        case 'addbook': 
            html = returnAddBookMarkup();
            break;
        case 'editbook':
            html = returnEditBookMarkup(); 
            break;
        case 'deletebook':
            html = returnDeleteBookMarkup();
            break; 
        case 'addcategory': 
            html = returnAddCategoryMarkup();
            break;
        case 'editcategory':
            html = returnEditCategoryMarkup();     
            break;
        case 'deletecategory':
            html = returnDeleteCategoryMarkup();
            break;
        case 'adduser':
            html = returnAddUserMarkup();
            break;
        case 'edituser':
            html = returnEditUserMarkup();   
            break;
        case 'deleteuser':
            html = returnDeleteUserMarkup();     
            break;
    };
    display.insertAdjacentHTML('beforeend',html); 
};

const returnAddBookMarkup = () => {
    return `<div class="adminform">
                <label for="book_name">Enter book name:</label>
                <input class="searchinput" id="book_name" type="text">
                <label for="book_author">Enter book author:</label>
                <input class="searchinput" id="book_author" type="text">
                <label for="book_year">Enter book year:</label>
                <input class="searchinput" id="book_year" type="number">
                <label>Pick category:</label>
                <select class="admincategories">
                    <option disabled selected value> -- select an option -- </option>
                    <!-- CATEGORY OPTIONS LOAD HERE -->
                </select>
                <button class="controlbutton adminsubmit" data-method="create" data-feature="book">Submit</button>
                <div class="controlbox">
                    <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                </div>
            </div>`
};

const returnEditBookMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- BOOKS LOAD HERE -->
                </div>
                <div class="adminform">
                    <label for="book_name">Enter book name:</label>
                    <input class="searchinput" id="book_name" type="text">
                    <label for="book_author">Enter book author:</label>
                    <input class="searchinput" id="book_author" type="text">
                    <label for="book_year">Enter book year:</label>
                    <input class="searchinput" id="book_year" type="number">
                    <label for="borroweduser">Book borrowed by user:</label>
                    <input class="searchinput" id="borroweduser" type="text" disabled>
                    <label>Pick category:</label>
                    <select class="admincategories">
                        <option disabled selected value> -- select an option -- </option>
                        <!-- CATEGORY OPTIONS LOAD HERE -->
                    </select>
                    <button class="controlbutton adminsubmit" data-method="edit" data-feature="book">Submit</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

const returnDeleteBookMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- BOOKS LOAD HERE -->
                </div>
                <div class="adminform">
                    <button class="controlbutton delete adminsubmit" data-method="delete" data-feature="book">Delete</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

const returnAddCategoryMarkup = () => {
    return `<div class="adminform">
                <label for="cat_name">Enter category name:</label>
                <input class="searchinput" id="cat_name" type="text">
                <button class="controlbutton adminsubmit" data-method="create" data-feature="category">Submit</button>
                <div class="controlbox">
                    <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                </div>
            </div>`
};

const returnEditCategoryMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- CATEGORIES LOAD HERE -->
                </div>
                <div class="adminform">
                    <label for="cat_name">Enter category name:</label>
                    <input class="searchinput" id="cat_name" type="text">
                    <button class="controlbutton adminsubmit" data-method="edit" data-feature="category">Submit</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

const returnDeleteCategoryMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- CATEGORIES LOAD HERE -->
                </div>
                <div class="adminform">
                    <button class="controlbutton delete adminsubmit" data-method="delete" data-feature="category">Delete</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

const returnAddUserMarkup = () => {
    return `<div class="adminform">
                <label for="user_name">Enter username:</label>
                <input class="searchinput" id="user_name" type="text">
                <label for="user_password">Enter password :</label>
                <input class="searchinput" id="user_password" type="text">
                <label>Pick role:</label>
                <select class="userroles">
                        <option disabled selected value> -- select an option -- </option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                </select>
                <button class="controlbutton adminsubmit" data-method="create" data-feature="user">Submit</button>
                <div class="controlbox">
                    <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                </div>
            </div>`
};

const returnEditUserMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- USERS LOAD HERE -->
                </div>
                <div class="adminform">
                    <label for="user_name">Enter username:</label>
                    <input class="searchinput" id="user_name" type="text">
                    <label>Pick role:</label>
                    <select class="userroles">
                        <option disabled selected value> -- select an option -- </option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                    <button class="controlbutton adminsubmit" data-method="edit" data-feature="user">Submit</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

const returnDeleteUserMarkup = () => {
    return `<div class="edit">
                <div class="adminlist">
                    <!-- USERS LOAD HERE -->
                </div>
                <div class="adminform">
                    <button class="controlbutton delete adminsubmit" data-method="delete" data-feature="user">Delete</button>
                    <div class="controlbox">
                        <a onClick="window.history.pushState({},'Admin Panel','/admin'); window.location.reload()" class="controlbutton controlback">Go back <ion-icon name="arrow-back"></ion-icon></a>
                    </div>
                </div>
            </div>`
};

export const makeAdminListItemActive = async(event) => {
    removeItemActive();
    event.target.classList.add('active');
};

export const adminListItemActive = async(data,returnBookFunction) => {
    let isBookControlPage = document.querySelector('#book_name');
    let isCategoryControlPage = document.querySelector('#cat_name');
    let isUserControlPage = document.querySelector('#user_name');

    if (isBookControlPage) {
        let element = document.querySelector('.button-returnbook');
        if (element) {
            element.remove();
        };
        let book = data.data.data[0];
        document.querySelector('#book_name').value = book.book_name;
        document.querySelector('#book_author').value = book.book_author;
        document.querySelector('#book_year').value = book.book_year;
        document.querySelector('#borroweduser').value = book.borrowed_user_name || 'Not borrowed';
        if (book.borrowed_user_name) {
            let returnBook = document.querySelector('#borroweduser');
            returnBook.insertAdjacentHTML('afterend',`<button class="button-returnbook">Return book</button>`);
            let returnBookButton = document.querySelector('.button-returnbook');
            returnBookButton.addEventListener('click',event => returnBookFunction(event,book.book_id));
        };
        document.querySelector('.admincategories').value = data.data.categoryId;
    };

    if (isCategoryControlPage) {
        let categoryName = document.querySelector('.active').textContent;
        document.querySelector('#cat_name').value = categoryName;
    };

    if (isUserControlPage) {
        let user = data.data[0];
        let userRole = user.user_role;
        let userName = document.querySelector('.active').textContent;
        document.querySelector('.userroles').value = userRole;
        document.querySelector('#user_name').value = userName;
    };
};

const removeItemActive = () => {
    let bookItems = document.querySelectorAll('.adminlist .item');
    bookItems.forEach(item => {
        item.classList.remove('active');
    });
};

export const getValues = (feature, method) => {
    switch (feature) {
        case 'book':
            let book_id;
            let book_name;
            let book_author;
            let book_year;
            let book_category_id;
            switch (method) {
                case 'delete':
                    book_id = document.querySelector('.active').dataset.id * 1;
                    return {
                        book_id
                    };
                case 'create':
                    book_name = document.querySelector('#book_name').value;
                    book_author = document.querySelector('#book_author').value;
                    book_year = document.querySelector('#book_year').value;
                    book_category_id = document.querySelector('.admincategories').value
                    return {
                        book_name,
                        book_author,
                        book_year,
                        book_category_id
                    };
                case 'edit':
                    book_id = document.querySelector('.active').dataset.id * 1;
                    book_name = document.querySelector('#book_name').value;
                    book_author = document.querySelector('#book_author').value;
                    book_year = document.querySelector('#book_year').value;
                    book_category_id = document.querySelector('.admincategories').value;
                    return {
                        book_name,
                        book_author,
                        book_year,
                        book_category_id,
                        book_id
                    };
            };
        case 'category':
            let cat_name;
            let cat_id;
            switch (method) {
                case 'create':
                    cat_name = document.querySelector('#cat_name').value;
                    return {
                        cat_name
                    };
                case 'edit':
                    cat_id = document.querySelector('.active').dataset.id * 1;
                    cat_name = document.querySelector('#cat_name').value;
                    return {
                        cat_name,
                        cat_id
                    };
                case 'delete':
                    cat_id = document.querySelector('.active').dataset.id * 1;
                    return {
                        cat_id
                    };
            };
        case 'user':
            let user_id;
            let user_name;
            let user_password;
            let user_role;
            switch (method) {
                case 'create':
                    user_name = document.querySelector('#user_name').value;
                    user_password = document.querySelector('#user_password').value;
                    user_role = document.querySelector('.userroles').value;
                    return {
                        user_name,
                        user_password,
                        user_role
                    };
                case 'edit':
                    user_id = document.querySelector('.active').dataset.id;
                    user_name = document.querySelector('#user_name').value;
                    user_role = document.querySelector('.userroles').value;
                    return {
                        user_name,
                        user_id,
                        user_role
                    };
                case 'delete':
                    user_id = document.querySelector('.active').dataset.id;
                    return {
                        user_id
                    };
            };
    };
};

export const fetchSubmitButton = () => {
    let adminSubmitButton = document.querySelector('.adminsubmit');
    return adminSubmitButton;
};

export const reRenderAfterAction = (method,response,nameOfEditedItem) => {
    if (response === 200) {
        switch (method) {
            case 'delete':
                document.querySelector('.active').remove();
                return;
            case 'edit':
                document.querySelector('.active').textContent = nameOfEditedItem;
                return;
        };
    };
    return;
};

export const renderRequestCount = async(requestResult) => {
    let display = document.querySelector('.navitemsright');
    let requestCount = requestResult;
    let requestCounter = document.querySelector('.requestcount');
    if (requestCounter) {
        requestCounter.remove();
    };
    if (requestCount > 0) {
        let html = `<a href='/requests' class="requestcount"><p>${requestCount} requests pending!</p></a>`;
        display.insertAdjacentHTML('beforeend',html);
    };
};


