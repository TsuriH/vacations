"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var config_1 = __importDefault(require("./config"));
// // Creating a connection object:
var connection = mysql2_1.default.createPool({
    host: config_1.default.mysqlHost,
    user: config_1.default.mysqlUser,
    password: config_1.default.mysqlPassword,
    database: config_1.default.mysqlDatabase,
    port: config_1.default.mysqlPort
    // hostName: config.hostName
});
// var connection = mysql.createPool({
//     host: 'containers-us-west-102.railway.app',
//     user: 'root',
//     password: 'WJi5kZhQWEGzdrPRNYXS',
//     database: 'railway',
//     port: 5576
//  });
//  // connection.connect();
connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results);
});
console.log("We're connected to MySQL");
function execute(sql, values) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, values, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
exports.default = {
    execute: execute
};
