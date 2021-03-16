var employeesDB = require('../model/employees');

module.exports = (req, res, next) => {
    employeesDB.findAll().then(rows =>{
        res.locals.lcListEmployees = rows;
        console.log('emp');
        next();
    }).catch(err => {
        console.log(err);
    });
}