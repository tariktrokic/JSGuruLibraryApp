const express = require('express');
const userController = require('./userController');
const protectRoute = require('../../protectRoute');
const isLoggedIn = require('../../isLoggedIn');
const isAdmin = require('../../isAdmin')

const router = express.Router();

router.get('/isloggedin',isLoggedIn,userController.isLoggedIn);
router.post('/signup',userController.signUpUser);
router.post('/login',userController.loginUser);
router.get('/logout',userController.logoutUser);
router.get('/',protectRoute,isAdmin,userController.getAllUsers);
router.get('/:id',protectRoute,isAdmin,userController.getUser);
router.post('/', protectRoute,isAdmin,userController.createUser);
router.patch('/:id', protectRoute,isAdmin,userController.updateUser);
router.delete('/:id', protectRoute,isAdmin,userController.deleteUser);

module.exports = router;