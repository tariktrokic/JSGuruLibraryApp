const bookService = require('../../modules/books/services/bookService');
const userService = require('../../modules/users/services/userService');
const asyncHandle = require('../../asyncHandle');

exports.getAllBooks = asyncHandle(async(req,res,next) => {
    let data = await bookService.getAllBooks(req.query.name,req.query.category);
    res.send(data);
});

exports.getBook = asyncHandle(async(req,res,next) => {
    let data = await bookService.getBook(req.params.bookId);
    res.send(data);
});

exports.getBookWithCategory = asyncHandle(async(req,res,next) => {
    let categoryId;
    let data = await bookService.fetchBookWithCategory(req.query.name);
    let category = await data[0].getCategories();
    categoryId = category[0].cat_id;
    borrowedUser = data[0].borrowed_user_name;
    res.send({data,categoryId,borrowedUser});
});

exports.createBook = asyncHandle(async(req,res,next) => {
    if (!req.body.book_category_id || !req.body.book_name || !req.body.book_author || !req.body.book_year) {throw new Error('Whoops, something bad happened')};
    let data = await bookService.createBook(req.body);
    res.send(data);
});

exports.updateBook = asyncHandle(async(req,res,next) => {
    if (!req.body.book_category_id || !req.body.book_name || !req.body.book_author || !req.body.book_year || !req.body.book_id) {throw new Error('Whoops, something bad happened')};
    let data = await bookService.updateBook(req.params.bookId,req.body);
    res.send(data);
});

exports.deleteBook = asyncHandle(async(req,res,next) => {
    let data = await bookService.deleteBook(req.params.bookId);
    res.send('Deleted');
});

exports.createRequestForBook = asyncHandle(async(req,res,next) => {
    let data = await bookService.createRequestForBook(req.params.bookId,req.user.user_id);
    res.send(data);
});

exports.deleteRequestForBook = asyncHandle(async(req,res,next) => {
    let data = await bookService.deleteRequestForBook(req.params.requestId);
    res.send('Deleted');
});

exports.getAllBookRequests = asyncHandle(async(req,res,next) => {
    let data = await bookService.getAllBookRequests();
    res.send(data);
});

exports.getAllBookRequestsForUser = asyncHandle(async(req,res,next) => {
    let data = await bookService.getAllBookRequestsForUser(req.user.user_id,req.params.bookId);
    res.send(data);
});

exports.countNotifications = asyncHandle(async(req,res,next) => {
    let data = await bookService.countNotifications(req.user.user_id);
    // STRING DATA SO EXPRESS ISN'T CONFUSED THINKING WE ARE SENDING A STATUS CODE
    res.send(`${data}`);
});

exports.borrowBook = asyncHandle(async(req,res,next) => {
    let request = await bookService.getAllBookRequests(req.params.requestId);
    let book = await bookService.getBook(request[0].book_id);
    if (!book[0].borrowed_user_name) {
        let user = await userService.getUser(request[0].user_id);
        await book[0].setUser(user);
        await bookService.createNotification(user.user_id,book[0].book_name);
        await bookService.deleteRequestForBook(req.params.requestId);
        res.send('Borrowed');
    } else {
        res.status(404).send('Book is already borrowed!');
    }
});

exports.getAllAcceptedRequests = asyncHandle(async(req,res,next) => {
    let data = await bookService.getAllAcceptedRequests(req.user.user_id);
    res.send(data);
});

exports.deleteAllAcceptedRequests = asyncHandle(async(req,res,next) => {
    let data = await bookService.deleteAllAcceptedRequests(req.user.user_id);
    res.send('Deleted');
});

exports.countRequests = asyncHandle(async(req,res,next) => {
    let data = await bookService.countRequests();
    // STRING DATA SO EXPRESS ISN'T CONFUSED THINKING WE ARE SENDING A STATUS CODE
    res.send(`${data}`)
});

exports.returnBook = asyncHandle(async(req,res,next) => {
    let book = await bookService.getBook(req.params.bookId);
    await book[0].setUser(null);
    res.send(book);
});