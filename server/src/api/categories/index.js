const express = require('express');
const categoryController = require('./categoryController');
const protectRoute = require('../../protectRoute');
const isAdmin = require('../../isAdmin');

const router = express.Router();

router.get('/',categoryController.getAllCategories);
router.post('/',protectRoute,isAdmin,categoryController.createCategory);
router.patch('/:categoryId',protectRoute,isAdmin,categoryController.updateCategory);
router.delete('/:categoryId',protectRoute,isAdmin,categoryController.deleteCategory);

module.exports = router;