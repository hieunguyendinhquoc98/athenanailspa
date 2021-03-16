//demo
var db = require("../../utils/db");

module.exports = {
    getListAdminService: () => {       
        return db.findAll('list_services');      
    }
};
