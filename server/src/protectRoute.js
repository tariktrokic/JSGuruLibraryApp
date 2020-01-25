const jwt = require('jsonwebtoken');
const asyncHandle = require('./asyncHandle');

const protectRouteMiddleware = asyncHandle(async(req,res,next) => {
    let token;
    let tokenData;
    let user;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    };
    if (!token) throw new Error('Please log in!');
    tokenData = await jwt.verify(token,process.env.JWT_SECRET);
    user = await sequelize.User.findOne({where: {user_id: tokenData.id}});
    if (!user) throw new Error(`User doesn't exist!`);
    req.user = user;
    res.locals.user = user;
    next();
});

module.exports = protectRouteMiddleware;