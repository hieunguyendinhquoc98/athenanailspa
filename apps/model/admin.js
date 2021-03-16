var db = require("../../utils/db");

module.exports = {
    findOne: username => {
        return db.findOne('admin', 'username', username);
    },
    findById: id => {
        return db.findById('admin', id);
    }
}