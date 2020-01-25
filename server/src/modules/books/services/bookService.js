const Sequelize = require('sequelize');
const sequelize = global.sequelize;
const Op = Sequelize.Op;

exports.getAllBooks = (searchTerm,categoryId) => {
    let query;
    if (categoryId) {
        let query = {attributes: ['book_id','book_name','book_author'],include: [{attributes: [],model: sequelize.Category,where: {cat_id: categoryId},as: 'categories'}]};
        if (searchTerm) {
            query = Object.assign(query, {where: {book_name: {[Op.like]: `%${searchTerm}%`}}});
            return sequelize.Book.findAll(query);
        } else {
            return sequelize.Book.findAll(query);
        };
    };
    if (searchTerm) {
        query = {where: {book_name: {[Op.like]: `%${searchTerm}%`}}};
        return sequelize.Book.findAll(query);
    } else {
        return sequelize.Book.findAll();
    };
};

exports.getBook = (bookId) => {
    let query = {where: {book_id: bookId}};
    return sequelize.Book.findAll(query);
};

exports.fetchBookWithCategory = (searchTerm) => {
    let query = {where: {book_name: searchTerm}};
    return sequelize.Book.findAll(query);
};

exports.createBook = async(bookObject) => {
    let book = await sequelize.Book.create({book_name: bookObject.book_name,book_author: bookObject.book_author,book_year: bookObject.book_year});
    let category_id = bookObject.book_category_id * 1;
    let category = await sequelize.Category.findAll({where: {cat_id: category_id}});
    return category[0].addBooks([book]);
};

exports.updateBook = async(bookId, bookObject) => {
    await sequelize.Book.update(bookObject,{where: {book_id: bookId}});
    let book = await sequelize.Book.findAll({where: {book_id: bookId}})
    let category = await sequelize.Category.findAll({where: {cat_id: bookObject.book_category_id * 1}});
    return book[0].setCategories([category[0]]);
};

exports.deleteBook = async(bookId) => {
    return sequelize.Book.destroy({where: {book_id: bookId}});
};

exports.createRequestForBook = (bookId,userId) => {
    return sequelize.Requests.create({user_id: userId,book_id: bookId});
};

exports.deleteRequestForBook = (requestId) => {
    return sequelize.Requests.destroy({where: {request_id: requestId}});
};

exports.getAllBookRequests = (id) => {
    if (!id) {
        return sequelize.Requests.findAll({include: [{attributes: ['user_name'],model: sequelize.User},{attributes: ['book_name'],model: sequelize.Book}]});
    };
    return sequelize.Requests.findAll({where: {request_id: id}});
};

exports.getAllBookRequestsForUser = (userId,bookId) => {
    return sequelize.Requests.findAll({where: {user_id: userId,book_id: bookId}});
};

exports.countNotifications = (userId) => {
    return sequelize.Notifications.count({where: {user_id: userId}});
};

exports.countRequests = () => {
    return sequelize.Requests.count();
};

exports.createNotification = (userId,bookName) => {
    return sequelize.Notifications.create({user_id: userId,book_name: bookName});
};

exports.getAllAcceptedRequests = (userId) => {
    return sequelize.Notifications.findAll({where: {user_id: userId}});
};

exports.deleteAllAcceptedRequests = (userId) => {
    return sequelize.Notifications.destroy({where: {user_id:userId}});
};
