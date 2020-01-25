export const getValues = () => {
    let searchValue = document.querySelector('.searchinput').value;
    let categoryValue = document.querySelector('.categories').value;
    return {
        searchValue,
        categoryValue
    };
};

export const clearLibrary = () => {
    let bookShelf = document.querySelector('.books');
    bookShelf.innerHTML = '';
};

export const renderLoader = () => {
    let bookShelf = document.querySelector('.books');
    let html = '<h1 class="loadericon">Loading...</h1>';
    bookShelf.insertAdjacentHTML('beforeend',html);
};

export const renderBooks = (results) => {
    let html;
    let bookshelf = document.querySelector('.books');
    // NO BOOKS FOUND FOR USER VALUES
    if (results.length === 0) {
        html = `<div class="book">
                    <ion-icon class="bookicon" name="thumbs-down"></ion-icon>
                    <h3 class="booktitle">No results found</h3>
                </div>`;
        bookshelf.insertAdjacentHTML('beforeend',html);
    } else {
        results.forEach((el) => {
            html = `<a class="bookanchor" href="#${el.book_id}">
                        <div class="book">
                            <ion-icon class="bookicon" name="book"></ion-icon>
                            <h3 class="booktitle">${el.book_name}</h3>
                            <p class="bookauthor">${el.book_author}</p>
                        </div>
                    </a>`;      
            bookshelf.insertAdjacentHTML('beforeend',html);
        });
    };
};

export const renderCategoryDropListItems = (categories) => {
    let html;
    let dropList = document.querySelector('.categories');
    categories.data.forEach((category) => {
        html = `<option value="${category.cat_id}">${category.cat_name}</option>`;
        dropList.insertAdjacentHTML('beforeend',html);
    });
};