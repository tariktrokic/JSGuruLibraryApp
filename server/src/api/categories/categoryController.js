const categoryService = require('../../modules/categories/services/categoryService');
const asyncHandle = require('../../asyncHandle');

exports.getAllCategories = asyncHandle(async(req,res,next) => {
    let data = await categoryService.getAllCategories();
    res.send(data)
});

exports.createCategory = asyncHandle(async(req,res,next) => {
    if (!req.body.cat_name) {throw new Error('Whoops, something bad happened')};
    let data = await categoryService.createCategory(req.body);
    res.send(data);
});

exports.updateCategory = asyncHandle(async(req,res,next) => {
    if (!req.body.cat_id || !req.body.cat_name) {throw new Error('Whoops, something bad happened')};
    let data = await categoryService.updateCategory(req.params.categoryId, req.body);
    res.send(data);
});

exports.deleteCategory = asyncHandle(async(req,res,next) => {
    let data = await categoryService.deleteCategory(req.params.categoryId);
    res.send('Deleted');
});