import mysql from "mysql2";
import config from "./config";

// // Creating a connection object:
const connection = mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDatabase,
    port: config.mysqlPort
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
    if (error) throw error;
    console.log('The solution is: ', results);
 });
 







console.log("We're connected to MySQL");

function execute(sql: string, values?: any): Promise<any> {

    return new Promise<any>((resolve, reject) => {

       
        connection.query(sql, values, (err, result) => {

          
            if (err) {
                reject(err);

                return;
            }

         
            resolve(result);

        });

    });

}

export default {
    execute
};