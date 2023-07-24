import {Router} from 'express';
import mysql from 'mysql';
/* import proxyUser from '../middleware/proxyUser.js'; */
const appEditorial = Router();
let connection;

appEditorial.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 3. Show all publishers and their addresses
appEditorial.get("/", (req,res)=>{
    connection.query('SELECT id_editorial, nombre, direccion FROM editorial', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the editorials :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the editorials :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appEditorial;