/* const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
    database : process.env.DB_NAME || "injection_test"
}); */
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(':memory:');

//Create users table

let sql = "CREATE TABLE IF NOT EXISTS `users` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , `email` VARCHAR(100) NOT NULL , `name` VARCHAR(240) NOT NULL)";

db.run(sql)


/* db.query(sql, function (err, data, fields) {
    if(err) throw err
    
    console.log(fields);
}) */

module.exports = db;