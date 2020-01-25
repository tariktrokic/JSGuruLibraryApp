const Sequelize = require('sequelize');
const bookCatSchema = require('./schemas/bookCat.schema')

const init = (dbClient) => {
    const modelName = 'Book_cat_map';
    const BookCatMap = dbClient.define(modelName,bookCatSchema(Sequelize),{tableName: 'book_categories_map',timestamps: false});
    dbClient[modelName] = BookCatMap;
    return BookCatMap;
};

module.exports = {
    init
};