import {Router} from 'express';
import mysql from 'mysql';
/* import proxyUser from '../middleware/proxyUser.js'; */
const appAutor = Router();
let connection;

appAutor.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 1. Get all authors and their nationality
appAutor.get("/", (req,res)=>{
    connection.query('SELECT id_autor, nombre, nacionalidad FROM autor;', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the authors :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the authors :(" });
        };
        res.end(JSON.stringify(result))
    });
});

//11. Show books written by a specific author (example:Gabriel Garcia)
appAutor.get("/:id",(req, res)=>{
    let autorId = req.params.id
    connection.query(`
        SELECT l.titulo AS libro, a.nombre AS autor
        FROM libro l
        INNER JOIN autor a
        ON a.id_autor = l.id_autor WHERE l.id_autor = ?`,
        [autorId],(err, result) =>{
        if (err) {
            console.error("¡ERROR! I can't show you the authors :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the authors :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appAutor;