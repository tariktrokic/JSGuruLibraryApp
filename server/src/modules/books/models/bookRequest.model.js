const Sequelize = require('sequelize');
const bookCatSchema = require('./schemas/bookRequest.schema')

const init = (dbClient) => {
    const modelName = 'Requests';
    const Request = dbClient.define(modelName,bookCatSchema(Sequelize),{tableName: 'requests',timestamps: false,indexes: [{unique: true,fields: ['user_id','book_id']}]});
    dbClient[modelName] = Request;
    return Request;
};

const initAssociate = (dbClient) => {
    dbClient.Requests.belongsTo(dbClient.User,{
        foreignKey: 'user_id',
        targetKey: 'user_id',
        onDelete: 'cascade'
    });
    dbClient.Requests.belongsTo(dbClient.Book,{
        foreignKey: 'book_id',
        targetKey: 'book_id'
    });
};

module.exports = {
    init,
    initAssociate
};