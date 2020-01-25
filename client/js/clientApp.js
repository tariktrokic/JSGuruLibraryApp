import SearchBar from './models/searchBar';
import BookDisplay from './models/bookDisplay';
import AdminControls from './models/adminControls';
import AuthForm from './models/authForm';
import RequestControls from './models/requestControls';
import PageUI from './models/pageUI';
import * as bookDisplayView from './views/bookDisplayView';
import * as searchBarView from './views/searchBarView';
import * as adminControlsView from './views/adminControlsView';
import * as authFormView from './views/authFormView';
import * as requestControlsView from './views/requestControlsView';

//INITIALIZE STATE

const state = {};

// HOME PAGE

let isHomePage = document.querySelector('.container');
if (isHomePage) {
    // CHECK IF USER IS LOGGED IN - THIS IS IMPORTANT FOR RENDERING THE UI ACCORDINGLY
    (async () => {
        try {
            let currentUser = await PageUI.checkIfLoggedIn();
            state.user = currentUser;
        } catch(e) {
            console.log('Problem with authentication!');
        };
    })();
    const controlSearchBar = async() => {
        // REMOVE HASH TO PREVENT UNEXPECTED RESULTS
        window.history.pushState({},'Home page','/');
        // GET VALUE FROM SEARCH BAR AND CATEGORY DROPLIST IF THE OPTION IS SET
        let values = searchBarView.getValues();
        // CREATE SEARCHBAR CLASS (MODEL)
        state.searchBar = new SearchBar(values);
        // CLEAR LIBRARY
        searchBarView.clearLibrary();
        // RENDER SPINNER FOR LOADING
        searchBarView.renderLoader();
        // CALL METHOD FROM SEARCH MODEL THAT MAKES AXIOS CALL TO FETCH BOOKS
        await state.searchBar.getBooks();
        // CLEAR BOOKSHELF
        searchBarView.clearLibrary();
        // RENDER RESULTS ON BOOKSHELF
        searchBarView.renderBooks(state.searchBar.books.data);
        // FETCH NOTIFICATION COUNT (IF ANY)
        if (state.user !== '') PageUI.renderNotificationCount();
};

const controlBook = async() => {
    let hash = window.location.hash.replace('#','');
    // CHECK IF THERE IS HASH (BOOK NAME) IN URL
    if (hash) {
    // IF THERE IS HASH CREATE BOOKDISPLAY CLASS (MODEL)
        state.currentBook = new BookDisplay(hash);
    // CLEAR BOOKSHELF
        searchBarView.clearLibrary();
    // RENDER LOADER SPINNER
        searchBarView.renderLoader();
    // CALL METHOD FROM BOOKDISPLAY CLASS THAT MAKES AXIOS CALL TO DESIRED ROOT
        await state.currentBook.getBook(state.user);
    // CLEAR BOOKSHELF
        searchBarView.clearLibrary();
    // RENDER RESULT ON BOOKSHELF
        bookDisplayView.renderBook(state.currentBook.book.data,state.currentBook.isRequested,state.user); 
    // FETCH BORROW BUTTON
        let borrowButton = bookDisplayView.fetchBorrowButton();
    // ADD CLICK EVENT LISTENER TO BORROW BUTTON TO EXECUTE FUNCTION
        if (borrowButton) borrowButton.addEventListener('click',controlBorrow);
    } else {
        controlSearchBar();
    };
};

const controlBorrow = async(e) => {
    e.preventDefault();
    // CREATE REQUEST TO ADMIN FOR BOOK 
    let requestData = await state.currentBook.createRequest();
    PageUI.renderMessage(requestData);
};

let notifications = document.querySelector('.notifications');
if (notifications) {
    notifications.addEventListener('click',async() => {
        PageUI.spreadNotificationArea();
        await PageUI.renderAllAcceptedRequests();
    });
};

document.querySelector('.searchicon').addEventListener('click',event => {
    event.preventDefault();
    controlSearchBar();
});

document.querySelector('.customlabel').addEventListener('click',event => { 
    let dropList = document.querySelector('.categories');
    if (dropList.disabled) {
        dropList.disabled = false;
    } else {
        dropList.disabled = true;
    }
});

document.querySelector('.button-main').addEventListener('click',event => {
    event.preventDefault();
    window.location.hash = '';
    PageUI.scrollToElement('body');
});

document.querySelector('.button-read').addEventListener('click',event => {
    event.preventDefault();
    PageUI.scrollToElement('readmore');
});

[controlSearchBar,async() => {searchBarView.renderCategoryDropListItems.call(this,await SearchBar.loadCategoryDropListItems())}].forEach((method)=>{
    window.addEventListener('load',method);
});

window.addEventListener('hashchange',controlBook);

window.addEventListener('keypress',event => {
    if (event.keyCode === 13) {
        controlSearchBar();
    };
});
};

// ADMIN PANEL

let isAdminPanel = document.querySelector('.admincontainer');
if (isAdminPanel) {
    const controlBuilder = async() => {
        let hash = window.location.hash.replace('#', '');
        // CHECK IF THERE IS HASH IN URL
        if (hash) {
            // CREATE CONTROLLER CLASS
            state.adminController = new AdminControls(hash);
            // CLEAR ADMIN CONTROLS
            adminControlsView.clearAdminControls();
            // RENDER SPECFIC CONTROLLER BASED ON HASH
            adminControlsView.renderSpecificControl(state.adminController.hash);
            // RENDER OTHER THINGS NEEDED TO PERFORM ADMIN ACTIONS
            await PageUI.fetchAdminControlNecessities(state.adminController.hash,adminControlsView.makeAdminListItemActive,adminControlsView.adminListItemActive);
            // FETCH ADMIN SUBMIT BUTTON FROM RENDERED CONTROL 
            let adminSubmitButton = adminControlsView.fetchSubmitButton();
            // ADD CLICK LISTENER AND ENTER LISTENER ON SUBMIT BUTTON TO EXECUTE NEXT FUNCTION
            adminSubmitButton.addEventListener('click',event => controlRequester(event,adminSubmitButton));
            window.addEventListener('keypress',(event) => {
                if (event.keyCode === 13) {
                    controlRequester(event,adminSubmitButton);
                };
            });
        } else {
            // NO HASH SO RENDER DEFAULT BUTTONS, CLEAR ADMIN CONTROLS FIRST
            adminControlsView.clearAdminControls();
            adminControlsView.renderInitial();
            adminControlsView.addButtonListenersToInitialControls();
        };
        let requestResult = await RequestControls.getRequestCount();
        adminControlsView.renderRequestCount(requestResult.data);
    };

    const controlRequester = async(event,adminSubmitButton) => {
        // PREVENT REFRESH
        event.preventDefault();
        // GET THE VALUES TO SEND REQUEST THAT IS NEEDED
        let data = adminControlsView.getValues(adminSubmitButton.dataset.feature,adminSubmitButton.dataset.method);
        // CHECK IF ALL FIELDS ARE PRESENT
        if (AdminControls.hasNullValues(data)) {
            PageUI.renderMessage({status: 404});
            return;
        };
        // MAKE AXIOS CALL TO CREATE/EDIT/DELETE FEATURE
        let response = await state.adminController.executeControl(adminSubmitButton.dataset.feature,adminSubmitButton.dataset.method,data);
        // RENDER SUCCESS OR ERROR MESSAGE
        PageUI.renderMessage(response);
        // IF DELETE METHOD AND SUCCESS THEN DELETE FROM SCREEN (The first value of data is always the name of the feature)
        adminControlsView.reRenderAfterAction(adminSubmitButton.dataset.method,response,Object.values(data)[0]);
    };

    ['hashchange','load'].forEach(event => {
        window.addEventListener(event,controlBuilder);
    });

};

// AUTH FORMS

let isAuthForms = document.querySelector('.authform');
if (isAuthForms) {
    const controlAuth = async() => {
        // GET USERNAME, PASSWORD AND ACTION (LOGIN/SIGNUP)
        let authInfo = authFormView.getCredentialsAndAction();
        // IF ERROR HAPPENED WITH CONFIRMING PASWORDS, DON'T CONTINUE FUNCTION
        if (!authInfo) return;
        // CREATE AUTH MODEL
        state.authForm = new AuthForm(authInfo);
        // PERFORM AUTH ACTION
        let result = await state.authForm.performAuthAction();
        // SUCCESS MESSAGE AND REDIRECT/FAIL MESSAGE
        authFormView.renderMessage(result);
    };

    let submitButton = document.querySelector('.authsubmit');
    submitButton.addEventListener('click',controlAuth);
    window.addEventListener('keypress',event => {
        if (event.keyCode === 13) {
            controlAuth()
        };
    });
};

// REQUESTS PAGE 

let isRequestsPage = document.querySelector('.requestcontainer');
if (isRequestsPage) {
    let controlRequest = async(event) => {
        if (event.target.matches('.requestaccept')){
            let result = await RequestControls.handleRequest(event.target.dataset.requestid,false);
            PageUI.renderMessage(result);
            event.target.parentElement.remove();
        } else if (event.target.matches('.requestreject')) {
            let result = await RequestControls.handleRequest(event.target.dataset.requestid,true);
            PageUI.renderMessage(result);
            event.target.parentElement.remove(); 
        };
    };

    let requestsContainer = document.querySelector('.requests');
    requestsContainer.addEventListener('click',e => {controlRequest(e)});
    window.addEventListener('load',async() => {
        let requests = await RequestControls.getRequests()
        requestControlsView.renderAllRequests(requests);
    });
};