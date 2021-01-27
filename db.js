const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "",
    database : process.env.DB_NAME || "injection_test"
});

//Create users table

let sql = "CREATE TABLE IF NOT EXISTS `injection_test`.`users` ( `id` INT(10) NOT NULL AUTO_INCREMENT , `email` VARCHAR(100) NOT NULL , `name` VARCHAR(240) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;";


db.query(sql, function (err, data, fields) {
    if(err) throw err
    
    console.log(fields);
})

module.exports = db;