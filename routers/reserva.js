import {Router} from 'express';
import mysql from 'mysql';
import proxyUser from '../middleware/proxyUser.js';
const appReserva = Router();
let connection;

appReserva.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 6. Get all reservations made with your date of reservation and status
appReserva.get("/", (req,res)=>{
    connection.query('SELECT id_reserva, fecha_reserva, fecha_reserva_fin, estado FROM reserva', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the loans :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the loans :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appReserva;