import {Router} from 'express';
import mysql from 'mysql';
/* import proxyUser from '../middleware/proxyUser.js'; */
const appEstadoLibro = Router();
let connection;

appEstadoLibro.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 4. Get the states of the books and their descriptions.
appEstadoLibro.get("/", (req,res)=>{
    connection.query('SELECT nombre, descripcion  FROM estado_libro', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the states of the books :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the states of the books :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appEstadoLibro;