const bookRouter = require('./api/books/index');
const categoryRouter = require('./api/categories/index');
const otherRouter = require('./api/other/index');
const userRouter = require('./api/users/index');

module.exports = (app) => {
    app.use(otherRouter);
    app.use('/books',bookRouter);
    app.use('/categories',categoryRouter);
    app.use('/users',userRouter);
};

