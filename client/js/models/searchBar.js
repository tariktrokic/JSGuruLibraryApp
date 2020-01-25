import axios from 'axios'; 

export default class SearchBar {
    constructor(values) {
        this.values = values;
    };

    async getBooks() {
        let resultBooks;
        let dropList = document.querySelector('.categories');
        // CHECK IF USER CHECKED "SEARCH BY CATEGORY" LABEL
        if (dropList.disabled) {
            this.values.categoryValue = '';
        };
        // USER QUERIED FOR BOOK WITH NAME AND CATEGORY
        if (this.values.searchValue.length > 0 && this.values.categoryValue >= 0) {
            resultBooks = await axios.get(`/books?category=${this.values.categoryValue}&name=${this.values.searchValue}`);
            this.books = resultBooks;
        } 
        // USER QUERIED FOR BOOK WITH NAME ONLY ("SEARCH BY CATEGORY" LABEL DISABLED)
        else if (this.values.searchValue.length > 0 && this.values.categoryValue === '') {
            resultBooks = await axios.get(`/books?name=${this.values.searchValue}`);
            this.books = resultBooks;
        } 
        // USER QUERIED FOR BOOK WITHOUT NAME BUT WITH CATEGORY
        else if (this.values.searchValue.length === 0 && this.values.categoryValue >= 0) {
            resultBooks = await axios.get(`/books?category=${this.values.categoryValue}`);
            this.books = resultBooks;
        }
        // USER DIDN'T ENTER ANY VALUES, RETURN ALL BOOKS
         else {
            resultBooks = await axios.get(`/books`);
            this.books = resultBooks;
        };
    };

    static async loadCategoryDropListItems() {
        let result = await axios.get('/categories');
        return result;
    };
};