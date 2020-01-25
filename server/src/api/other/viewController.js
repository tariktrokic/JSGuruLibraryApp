exports.renderHomePage = (req,res) => {
    res.render('index');
};

exports.renderAdmin = (req,res) => {
    res.render('admin');
};
 
exports.renderSignUp = (req,res) => {
    res.render('signup')
};

exports.renderLogIn = (req,res) => {
    res.render('login');
};

exports.renderRequestPage = (req,res) => {
    res.render('requests');
};