exports.createUser = (userObject) => {
    return sequelize.User.create(userObject);
};

exports.fetchAllUsers = () => {
    return sequelize.User.findAll();
};

exports.fetchUser = (userId) => {
    return sequelize.User.findAll({where: {user_id: userId}});
};

exports.getUserForLogin = (userName) => {
    return sequelize.User.findOne({where: {user_name: userName}});
};

exports.getUser = (userId) => {
    return sequelize.User.findOne({where: {user_id: userId}});
};

exports.deleteUser = (userId) => {
    return sequelize.User.destroy({where: {user_id:userId}});
};