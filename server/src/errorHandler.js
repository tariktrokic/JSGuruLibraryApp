const errorHandler = (err,req,res,next) => {
    if (res.headersSent) {return next(err);};
    res.status(404).json({
    message: err.message,
    status: err.status,
    url: req.originalUrl,
    stack: err.stack
   });
};

module.exports = errorHandler;