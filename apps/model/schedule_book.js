var db = require("../../utils/db");

function addScheduleBook(entity){
    return db.add('schedule_booking', entity);
}
function getAllScheduleBook(date){
    var query = 'SELECT schedule_booking.id, schedule_booking.customer_name, schedule_booking.phone_number, schedule_booking.schedule_booking, employees.firstname AS firstnamestaff,employees.lastname AS lastnamestaff, list_services.services_name FROM schedule_booking, employees, list_services WHERE employees.id = schedule_booking.employee_id AND schedule_booking.service_id = list_services.id AND  DAYOFMONTH(schedule_booking.schedule_booking) = DAYOFMONTH(' +"'" + date + "') ORDER BY schedule_booking.schedule_booking ASC";
    return db.excute(query);
}
module.exports = {
    getAllScheduleBook: getAllScheduleBook,
    addScheduleBook: addScheduleBook
};