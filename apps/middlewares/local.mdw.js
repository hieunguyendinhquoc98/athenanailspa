var servicesDB = require('../model/list_services');

module.exports = (req, res, next) => {
    servicesDB.findAll().then(rows =>{
        res.locals.lcListServices = rows;
        console.log('services');
        next();
    }).catch(err => {
        console.log(err);
    });
}