const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

db.connect((err) => {
    if (err) {
        console.log("Error conectar base", err);
        return;
    }
    console.log("Conectar base");
});

module.exports = db;