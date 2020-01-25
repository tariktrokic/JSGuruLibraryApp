const express = require('express');
const viewController = require('./viewController');
const protectRoute = require('../../protectRoute');
const isLoggedIn = require('../../isLoggedIn');
const isAdmin = require('../../isAdmin');

const router = express.Router();

router.get('/',isLoggedIn,viewController.renderHomePage);
router.get('/admin',protectRoute,isAdmin,viewController.renderAdmin);
router.get('/signup',isLoggedIn,viewController.renderSignUp);
router.get('/login',isLoggedIn,viewController.renderLogIn);
router.get('/requests',protectRoute,isAdmin,viewController.renderRequestPage);

module.exports = router;