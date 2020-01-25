const Sequelize = require('sequelize');
const bookNotification = require('./schemas/bookNotifcation.schema');

const init = (dbClient) => {
    const modelName = 'Notifications';
    const Notification = dbClient.define(modelName,bookNotification(Sequelize),{tableName: 'notifications',timestamps: false});
    dbClient[modelName] = Notification;
    return Notification;
};

const initAssociate = (dbClient) => {
    dbClient.Notifications.belongsTo(dbClient.User,{
        foreignKey: 'user_id',
        targetKey: 'user_id',
        onDelete: 'cascade'
    });
 };

module.exports = {
    init,
    initAssociate
};