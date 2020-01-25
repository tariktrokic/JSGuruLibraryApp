const Sequelize = require('sequelize');
const categoryModel = require('./modules/categories/models/category.model')
const bookModel = require('./modules/books/models/book.model');
const bookCatModel = require('./modules/books/models/bookCat.model');
const userModel = require('./modules/users/models/user.model');
const bookRequestModel = require('./modules/books/models/bookRequest.model');
const bookNotificationModel = require('./modules/books/models/bookNotifcation.model');

const sequelize = new Sequelize(process.env.DATABASE,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD,{
    host: process.env.DATABASE_HOST,
    dialect: process.env.SQL_DATABASE_DIALECT
});

global.sequelize = sequelize;

sequelize.authenticate()
.then(async() => {
    console.log('Connected!');
    const Category = categoryModel.init(sequelize);
    const Book = bookModel.init(sequelize);
    const BookCatMap = bookCatModel.init(sequelize);
    const User = userModel.init(sequelize);
    const BookRequest = bookRequestModel.init(sequelize);
    const BookNotification = bookNotificationModel.init(sequelize);
    bookModel.initAssociate(sequelize);
    categoryModel.initAssociate(sequelize);
    bookNotificationModel.initAssociate(sequelize);
    bookRequestModel.initAssociate(sequelize);
    User.beforeCreate(async(user,options) => {await userModel.hashPassword(user,options)});
    User.beforeUpdate(async(user,options) => {await userModel.hashPassword(user,options)});
    await sequelize.sync();
    console.log('Database synced!')
}).catch(e => {
    console.log('Unable to connect to the database:', e);
});

