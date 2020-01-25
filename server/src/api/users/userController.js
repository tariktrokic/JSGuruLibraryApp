const userService = require('../../modules/users/services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandle = require('../../asyncHandle');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.signUpUser = asyncHandle(async(req,res,next) => {
    let token;
    let userExists = await sequelize.User.count({where: {user_name: req.body.user_name}}); 
    if (userExists !== 0) throw new Error('That username is taken');
    let data = await userService.createUser({user_name: req.body.user_name,user_password: req.body.user_password});
    token = jwt.sign({id: data.user_id},process.env.JWT_SECRET,{expiresIn: '1d'});
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true
    });
    data.password = undefined;
    res.send({data,token});
});

exports.loginUser = asyncHandle(async(req,res,next) => {
    let isCorrectPass;
    let token;
    if (!req.body.user_name || !req.body.user_password) throw new Error('Enter username and password');
    let data = await userService.getUserForLogin(req.body.user_name);
    if (!data) throw new Error('Invalid username or password');
    isCorrectPass = await bcrypt.compare(req.body.user_password, data.user_password);
    if (!isCorrectPass) throw new Error('Invalid username or password');
    token = jwt.sign({id: data.user_id},process.env.JWT_SECRET,{expiresIn: '1d'});
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true
    });
    data.password = undefined;
    res.send({data,token});
});

exports.logoutUser = asyncHandle(async(req,res,next) => {
    res.cookie('jwt','loggedout',{
        expires: new Date(Date.now() + 1 * 500),
        httpOnly: true
    });
    setTimeout(() => res.redirect('/'),600);
});

exports.getAllUsers = asyncHandle(async(req,res,next) => {
    let data = await userService.fetchAllUsers();
    res.send(data);
});

exports.getUser = asyncHandle(async(req,res,next) => {
    let data = await userService.fetchUser(req.params.id);
    res.send(data);
});

exports.createUser = asyncHandle(async(req,res,next) => {
    let userExists = await sequelize.User.count({where: {user_name: req.body.user_name}}); 
    if (userExists !== 0) throw new Error('That username is taken');
    let data = await userService.createUser({user_name: req.body.user_name, user_password: req.body.user_password, user_role: req.body.user_role});
    data.user_password = undefined;
    res.send(data);
});

exports.updateUser = asyncHandle(async(req,res,next) => {
    let data;
    let userExists = await sequelize.User.count({where: {user_name: req.body.user_name, user_id: {[Op.not]: req.params.id}}}); 
    if (userExists !== 0) throw new Error('That username is taken');
    let user = await sequelize.User.findAll({where: {user_id: req.params.id}});
    data = await user[0].update(req.body);
    data.user_password = undefined;
    res.send(data);
});

exports.deleteUser = asyncHandle(async(req,res,next) => {
    let data = await userService.deleteUser(req.params.id);
    res.send('Deleted');
});

exports.isLoggedIn = asyncHandle(async(req,res,next) => {
    res.send(req.user);
});
