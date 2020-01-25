import axios from 'axios';

export default class BookDisplay {
    constructor(bookId) {
        this.bookId = bookId;
    };

    async getBook(user) {
        let resultBook;
        if (user === '') {
            resultBook = await axios.get(`/books/${this.bookId}`);
            this.book = resultBook;
            return;
        };
        resultBook = await axios.get(`/books/${this.bookId}`);
        let borrowedBook = await axios.get(`/books/userbookrequests/${this.bookId}`);
        this.isRequested = borrowedBook.data.length > 0; 
        this.book = resultBook;
    };

    async createRequest() {
        try {
            let resultRequest = await axios.get(`/books/createrequest/${this.bookId}`);
            return resultRequest;
        } catch(e) {
            return e.response;
        };
    };
};