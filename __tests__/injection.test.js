const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const db = require("../db");

/* beforeEach(() => {
    let createTableSQL = "CREATE TABLE IF NOT EXISTS `users` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , `email` VARCHAR(100) NOT NULL , `name` VARCHAR(240) NOT NULL)";

    db.run(createTableSQL, function (err) {
        let insert = "INSERT INTO users (name, email) VALUES (?,?)";
        db.run(insert, ["user1@test.com", "User 1"]);
        db.run(insert, ["user2@test.com", "User 2"]);
        db.run(insert, ["user3@test.com", "User 3"]);
    })
    
}); */

let createTableSQL = "CREATE TABLE IF NOT EXISTS `users` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , `email` VARCHAR(100) NOT NULL , `name` VARCHAR(240) NOT NULL)";

let insert = "INSERT INTO users (name, email) VALUES ('user1@test.com','User 1'), ('user2@test.com','User 2'), ('user3@test.com','User 3')";

test ("Test malicious data exposure", (done) => {

    db.run(createTableSQL, function (err) {
        
        db.run(insert, function () {

            let maliciousUserId = `1' OR 1=1;--`;

            request.post("/users/fetch/")
            .send({id : maliciousUserId})
            .set('Accept', "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                if(err) return done(err)
                
                //Should not return more than one record
                expect(res.body.data.length).toBeLessThan(2)
                done();
            })
            
        });
        
    })

    
})

/* test ("Test malicious delete operation", (done) => {

    let maliciousUserId = `' OR 1=1; DROP TABLE users;--`;

            request.post("/users/fetch/")
            .send({id : maliciousUserId})
            .set('Accept', "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end(function (err, res) {
                if(err) return done(err)
                console.log(res.body);
                //expect(res.body.data.length).toBe(1)
                request.get("/users/fetch")
                .end(function (err, res) {
                    console.log(res.body.data)
                    expect(res.body.data.length).toBe(3);
                    done();
                })
                
            })

    
}) */
