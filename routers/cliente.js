import {Router} from 'express';
import mysql from 'mysql';
import proxyUser from '../middleware/proxyUser.js';
const appCliente = Router();
let connection;

appCliente.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 11. List users and their emails.
appCliente.get("/", (req,res)=>{
    connection.query('SELECT id_usuario, nombre , email FROM usuario', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the users :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the users :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appCliente;