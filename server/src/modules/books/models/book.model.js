const Sequelize = require('sequelize');
const bookSchema = require('./schemas/book.schema');

const init = (dbClient) => {
    const modelName = 'Book';
    const Book = dbClient.define(modelName,bookSchema(Sequelize),{tableName: 'books',timestamps: false});
    dbClient[modelName] = Book;
    return Book;
};

const initAssociate = (dbClient) => {
    dbClient.Book.belongsToMany(dbClient.Category,{
    through: dbClient.Book_cat_map,
    foreignKey: 'book_id',
    targetKey: 'cat_id',
    as: 'categories'
   });
   dbClient.Book.belongsTo(dbClient.User,{
    foreignKey: 'borrowed_user_name',
    targetKey: 'user_name',
    onDelete: 'restrict'
   });
   dbClient.Book.hasMany(dbClient.Requests,{
    sourceKey: 'book_id',
    foreignKey: 'book_id'
   });
};

module.exports = {
    init,
    initAssociate
};