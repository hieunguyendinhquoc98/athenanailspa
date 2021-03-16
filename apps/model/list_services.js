var db = require("../../utils/db");
function addListService(entity){
    return db.add('list_services', entity);
}
function updateListService(id,entity){
    return db.update('list_services','id',id, entity);
}
function findServiceById(id){
    return db.findById('list_services', id);
}
function deleteListService(id){
    return db.delete('list_services','id', id);
}
module.exports = {
   findAll: () => {
       return db.findAll('list_services');
   },
   addListService: addListService,
   updateListService: updateListService,
   findServiceById: findServiceById,
   deleteListService: deleteListService,

}