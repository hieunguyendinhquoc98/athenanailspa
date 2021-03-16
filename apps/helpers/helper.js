var bcrypt = require('bcrypt');
var config = require('config');
var moment = require("moment");

function GetTimeNow() {
    return moment().format("YYYY/MM/DD h:mm:ss")
}
function UpdatePostDate(value) {
    return moment(value).format("YYYY/MM/DD hh:mm:ss")
}


function hash_password(password) {
    var saltRounds = config.get('salt');
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

module.exports = {
    hash_password: hash_password,
    GetTimeNow: GetTimeNow,
    UpdatePostDate: UpdatePostDate
}