const sequelize = global.sequelize;

exports.getAllCategories = () => {
    return sequelize.Category.findAll();
};

exports.createCategory = (categoryObject) => {
    return sequelize.Category.create(categoryObject);
};

exports.updateCategory = (categoryId, categoryObject) => {
    return sequelize.Category.update(categoryObject,{where: {cat_id: categoryId}});
};

exports.deleteCategory = async(categoryId) => {
    return sequelize.Category.destroy({where: {cat_id: categoryId}});
};