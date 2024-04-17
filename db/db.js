const mysql = require("mysql");

const db = mysql.createConnection({
    host: "bvqs08tvbnsw9ov0fv5p-mysql.services.clever-cloud.com",
    user: "u5q74p3qoa8xv7wh",
    password: "gDszhr1jlPKoni6uOXr5",
    database: "bvqs08tvbnsw9ov0fv5p",
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.log("Error conectar base", err);
        return;
    }
    console.log("Conectar base");
});

module.exports = db;