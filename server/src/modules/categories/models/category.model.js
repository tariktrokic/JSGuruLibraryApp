const Sequelize = require('sequelize');
const categorySchema = require('./schemas/category.schema');

const init = (dbClient) => {
    const modelName = 'Category';
    const Category = dbClient.define(modelName,categorySchema(Sequelize),{tableName: 'categories',timestamps: false});
    dbClient[modelName] = Category;
    return Category;
};

const initAssociate = (dbClient) => {
    dbClient.Category.belongsToMany(dbClient.Book,{
    through: dbClient.Book_cat_map,
    foreignKey: 'cat_id',
    targetKey: 'book_id',
    as: 'books',
    onDelete: 'restrict'
   });
};

module.exports = {
    init,
    initAssociate
};