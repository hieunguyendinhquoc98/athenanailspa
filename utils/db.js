var mysql = require('mysql');
var utils = require('../apps/helpers/helper')
var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: '3308',
        user: 'root',
        password: '123123',
        database: 'athena_nails'
    });
};
function getConnection() {
    var connection = createConnection();
    if (connection != null) {
        console.log('Success connect to db');
        return connection;
    }
    console.log('Failed connect to db');
    return null;
}
module.exports = {
    excute: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
    add: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            var sql = `insert into ${tableName} set ?`;
            var conn = createConnection();
            conn.connect();
            entity["created_at"] = utils.GetTimeNow();
            entity["updated_at"] = utils.GetTimeNow();
            conn.query(sql, entity, (error, value) => {
                if (error) reject(error);
                else {
                    resolve(value);
                }
                conn.end();
            });
        });
    },
    update: (tableName, idField, id, entity) => {
        return new Promise((resolve, reject) => {
            delete entity[idField];
            var sql = `update ${tableName} set ? where ${idField} = ${id}`;
            var connection = createConnection();
            connection.connect();
            entity["updated_at"] = utils.GetTimeNow();
            connection.query(sql, entity, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.changedRows);
                }
                connection.end();
            });
        });
    },
    delete: (tableName, idField, id) => {
        return new Promise((resolve, reject) => {
            var sql = `delete from ${tableName} where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, id, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.affectedRows);
                }
                connection.end();
            });
        });
    },
    deleteall: (tableName, idField,id) => {
        return new Promise((resolve, reject) => {
            var sql = `delete from ${tableName} where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, id, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.affectedRows);
                }
                connection.end();
            });
        });
    },
    //Find all table in db
    findAll: (tableName) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName}`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, (err, value) => {
                if (err) reject(err);
                else resolve(value);
                conn.end();
            });
        })
    },
    findById: (tableName, id) => {
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} WHERE id = ?`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, id, (err, value) => {
                if (err) reject(err);
                else {
                    resolve(value[0]);
                }
                conn.end();
            });
        });
    },
    findOne: (tableName, field, value) => {
        console.log(value);
        return new Promise((resolve, reject) => {
            var sql = `SELECT * from ${tableName} WHERE ${field} = ?`;
            var conn = createConnection();
            conn.connect();
            conn.query(sql, value, (err, value) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(value[0]);
                }
                conn.end();
            });
        });
    },
    getConnection: getConnection
};