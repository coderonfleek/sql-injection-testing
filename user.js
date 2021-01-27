const db = require("./db");

function getUsers(req, res) {
    
    let sql = `SELECT * FROM users`;

    db.query(sql, function (err, data, fields) {
        if(err) throw err
        
        res.json({
            status : 200,
            data,
            message : "Successfully fetched Users"
        })
    })
}

function getUser(req, res) {

    let sql = `SELECT * FROM users WHERE id='${req.params.id}'`;

    db.query(sql, function (err, data, fields) {
        if(err) throw err
        
        res.json({
            status : 200,
            data : data[0],
            message : "User record retrieved"
        })
    })
    
}

function createUser(req, res) {
    
    console.log(req);
    let sql = `INSERT INTO users(email, name) VALUES ('${req.body.email}', '${req.body.name}')`;

    db.query(sql, function (err, data, fields) {
        if(err) throw err
        
        res.json({
            status : 200,
            data,
            message : "User successfully created"
        })
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser
}