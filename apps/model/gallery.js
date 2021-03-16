var db = require("../../utils/db");

module.exports = {
    findAll: ()=>{
        return db.findAll('img_gallery');
    }
}