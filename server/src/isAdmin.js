const asyncHandle = require('./asyncHandle');

const isAdminMiddleware = asyncHandle(async(req,res,next) => {
    let role = req.user.user_role;
    if (role !== 'admin') throw new Error(`You are not an admin!`);
    next();
});

module.exports = isAdminMiddleware;