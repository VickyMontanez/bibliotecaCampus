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

export default appAutor;