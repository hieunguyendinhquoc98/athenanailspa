var db = require("../../utils/db");
function addServiceDetails(entity){
    return db.add('service_detail', entity);
}
function updateServiceDetails(id,entity){
    return db.update('service_detail','id',id, entity);
}
function findServiceDetails(id){
    return db.findById('service_detail', id);
}
function deleteServiceDetails(id){
    return db.delete('service_detail','id', id);
}
function deleteallServiceDetails(id){
    return db.deleteall('service_detail','id_services',id);
}
module.exports = {
    loadServiceDescription: (tableName, id) => {
        var conn = db.getConnection();      
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} WHERE id_services = ${id}`;
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) reject(err);
                else resolve(value);
                conn.end();
            });
        })
    },
    addServiceDetails: addServiceDetails,
    updateServiceDetails: updateServiceDetails,
    findServiceDetails: findServiceDetails,
    deleteServiceDetails: deleteServiceDetails,
    deleteallServiceDetails:deleteallServiceDetails,
}