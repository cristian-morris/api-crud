const mysql = require("mysql");

const db = mysql.createConnection({

});

db.connect((err) => {
    if (err) {
        console.log("Error conectar base", err);
        return;
    }
    console.log("Conectar base");
});

module.exports = db;