export const renderBook = (result,isRequested,loggedIn) => {
    let library = document.querySelector('.books');
    let borrowButton;
    let html;
    if (result.length === 0) {
        html = `<div class="book">
                    <ion-icon class="bookicon" name="thumbs-down"></ion-icon>
                    <h3 class="booktitle">No results found</h3>
                </div>`;
        library.insertAdjacentHTML('beforeend',html);
    } else {
        if (!loggedIn) {
            borrowButton = '<a class="button-notavailable">Log in to borrow books</a>'
        } else if (result[0].borrowed_user_name === loggedIn.user_name) {
            borrowButton = '<a class="button-notavailable">Your request for this book was accepted</a>';
        } else if (result[0].borrowed_user_name || isRequested) {
            borrowButton = '<a class="button-notavailable">Book not available at this time</a>';
        } else {
            borrowButton = '<a class="button-borrow">Borrow</a>';
        };
        html = `<div class="bookdisplay">
                    <ion-icon class="bookpic" name="book"></ion-icon>
                    <div class="bookdetails">
                        <h1 class="bookname">${result[0].book_name}</h1>
                        <p class="bookdescription">Written ${result[0].book_year} by ${result[0].book_author}</p>
                        ${borrowButton}
                    </div>
                </div>`;
        library.insertAdjacentHTML('beforeend',html);
    };
};

export const fetchBorrowButton = () => {
    let borrowButton = document.querySelector('.button-borrow');
    return borrowButton;
};