const asyncHandle = fn => {
    return (res,req,next) => {
        fn(res,req,next).catch(next);
   };
};

module.exports = asyncHandle;