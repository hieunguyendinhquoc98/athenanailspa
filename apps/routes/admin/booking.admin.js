var express = require('express');
var moment = require('moment');
var router = express.Router();
var bookingModel = require('../../model/schedule_book');
router.get('/', (req, res) => {
    var date = moment(Date.now()).format('YYYY-MM-DD');
    if(req.query.schedule!=null){
        date = req.query.schedule;
    }
    var b = bookingModel.getAllScheduleBook(date);
    b.then(rows => {
        console.log(rows);
        res.render('admin/schedule_appointment', {
            layout: 'layouts/main_admin',
            booking: rows,
            date: date
        });
    }).catch(err => {
        console.log(err);
    });
});
module.exports = router;