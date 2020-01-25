const express = require('express');
const bookController = require('./bookController.js');
const protectRoute = require('../../protectRoute');
const isAdmin = require('../../isAdmin');

const router = express.Router();

router.get('/',bookController.getAllBooks);
router.get('/withcategory',bookController.getBookWithCategory);
router.get('/requests',protectRoute,isAdmin,bookController.getAllBookRequests);
router.get('/return/:bookId',protectRoute,isAdmin,bookController.returnBook);
router.get('/countnotifications',protectRoute,bookController.countNotifications);
router.get('/countrequests',protectRoute,isAdmin,bookController.countRequests);
router.get('/acceptedrequests',protectRoute,bookController.getAllAcceptedRequests);
router.delete('/acceptedrequests',protectRoute,bookController.deleteAllAcceptedRequests);
router.get('/userbookrequests/:bookId',protectRoute,bookController.getAllBookRequestsForUser);
router.get('/createrequest/:bookId',protectRoute,bookController.createRequestForBook);
router.delete('/requests/:requestId',protectRoute,isAdmin,bookController.deleteRequestForBook);
router.get('/borrow/:requestId',protectRoute,isAdmin,bookController.borrowBook);
router.post('/',protectRoute,isAdmin,bookController.createBook);
router.get('/:bookId',bookController.getBook);
router.patch('/:bookId',protectRoute,isAdmin,bookController.updateBook);
router.delete('/:bookId',protectRoute,isAdmin,bookController.deleteBook);

module.exports = router;