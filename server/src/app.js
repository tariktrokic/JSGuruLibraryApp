const path = require('path');
const dotenv = require('dotenv').config({path: path.resolve(__dirname,'../../.env')});
const express = require('express');
require('./dbConnect');
const routes = require('./routes');
const errorHandler = require('./errorHandler');
const cookieParser = require('cookie-parser');

const app = express();
const publicPath = path.join(__dirname, '../../client');
const viewPath = path.join(__dirname, '../../client/views');
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser());
routes(app);
app.use(errorHandler);

try {
    app.listen(3000, () => {console.log('The server is up!')})
} catch(e) {
    console.log('There is a problem with the server!',e);
 };
