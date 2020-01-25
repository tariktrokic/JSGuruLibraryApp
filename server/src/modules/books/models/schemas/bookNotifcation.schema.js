const bookNotification = (dataTypes) => { 
    return {notification_id: {type: dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    user_id: {type: dataTypes.INTEGER,allowNull: false},
    book_name: {type: dataTypes.STRING,allowNull: false}}
};
 
 module.exports = bookNotification;