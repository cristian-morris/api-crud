const express = require('express');
const db = require('./db/db');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3002);

// Registrar juego
app.post("/create", (req, res) => {
    const { nombre, categoria, añoDeSalida, precio } = req.body;

    db.pool.query('INSERT INTO game (nombre, categoria, añoDeSalida, precio) VALUES (?, ?, ?, ?)', [nombre, categoria, añoDeSalida, precio], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al registrar el juego");
        } else {
            res.send("Juego registrado con éxito");
        }
    });
});

// Obtener juegos
app.get("/games", (req, res) => {
    db.pool.query("SELECT * FROM game", (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener los juegos");
        } else {
            res.json(results);
        }
    });
});

app.get("/", (req, res) => {
   res.send('bienvenido al api de juegos')
});

// Obtener juego por ID
app.get("/games/:id", (req, res) => {
    const gameId = req.params.id;

    db.pool.query("SELECT * FROM game WHERE id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener el juego");
        } else {
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).send("Juego no encontrado");
            }
        }
    });
});

// Actualizar juego
app.put("/games/:id", (req, res) => {
    const gameId = req.params.id;
    const { nombre, categoria, añoDeSalida, precio } = req.body;

    db.pool.query("UPDATE game SET nombre = ?, categoria = ?, añoDeSalida = ?, precio = ? WHERE id = ?", [nombre, categoria, añoDeSalida, precio, gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al actualizar el juego");
        } else {
            res.send("Juego actualizado con éxito");
        }
    });
});

// Eliminar juego
app.delete("/games/:id", (req, res) => {
    const gameId = req.params.id;

    db.pool.query("DELETE FROM game WHERE id = ?", [gameId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al eliminar el juego");
        } else {
            res.send("Juego eliminado con éxito");
        }
    });
});



app.listen(app.get("port"), ()=>{
    console.log("funcionando en :", app.get("port"));
});

