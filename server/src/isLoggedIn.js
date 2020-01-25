const jwt = require('jsonwebtoken');
const asyncHandle = require('./asyncHandle');

const isLoggedInMiddleware = asyncHandle(async(req,res,next) => {
    let tokenData;
    if (req.cookies.jwt) {
        tokenData =  await jwt.verify(req.cookies.jwt,process.env.JWT_SECRET);
        user = await sequelize.User.findOne({where: {user_id: tokenData.id}});
        if (!user) {
            req.loggedIn = false;
            return next();
        };
        req.user = user;
        res.locals.user = user;
        req.loggedIn = true;
        return next();
    };
    req.user = undefined;
    req.loggedIn = false;
    res.locals.user = undefined;
    next();
});

module.exports = isLoggedInMiddleware;