var servicesDB = require('../model/list_services');

module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.lcUserInfo = req.user;
        next();
    } else {
        req.flash('error', 'Please log in to view that resource');
        res.redirect('/login');
    }
}