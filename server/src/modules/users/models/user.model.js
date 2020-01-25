const Sequelize = require('sequelize');
const userSchema = require('./schemas/user.schema');
const bcrypt = require('bcryptjs');

const init = (dbClient) => {
    const modelName = 'User';
    const User = dbClient.define(modelName,userSchema(Sequelize),{tableName: 'users', timestamps: false});
    dbClient[modelName] = User;
    return User;
};

const initAssociate = (dbClient) => {
    dbClient.User.hasOne(dbClient.Book,{
    targetKey: 'borrowed_user_name',
    sourceKey: 'user_name'
    });
    dbClient.User.hasOne(dbClient.Notifications,{
    foreignKey: 'user_id',
    sourceKey: 'user_id'
    });
    dbClient.User.hasOne(dbClient.Requests,{
    foreignKey: 'user_id',
    sourceKey: 'user_id'
    });
};

const hashPassword = async(user,options) => {
    if (!user.changed('user_password') && !user.isNewRecord) {return;};
    user.user_password = await bcrypt.hash(user.user_password, 12);
};

module.exports = {
    init,
    hashPassword,
    initAssociate
};