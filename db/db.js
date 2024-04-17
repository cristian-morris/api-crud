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

function handleDisconnect() {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000); // Intentar reconectar después de 2 segundos
        } else {
            console.log('Connected to database!');
        }
    });

    db.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconectar si se pierde la conexión
        } else {
            throw err;
        }
    });
}

handleDisconnect(); // Iniciar la conexión inicial y manejar reconexiones

module.exports = db;