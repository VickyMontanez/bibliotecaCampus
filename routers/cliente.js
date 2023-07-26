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

// 10. List users and their emails.
appCliente.get("/", (req,res)=>{
    connection.query('SELECT id_usuario, nombre , email FROM usuario', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the users with them emails :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the users with them emails :(" });
        };
        res.end(JSON.stringify(result))
    });
});

//13.List the loans made by a user (example: John Perez).
appCliente.get("/:id", (req, res)=>{
    let user = req.params.id;
    connection.query(`
    SELECT p.id_prestamo, u.nombre, u.apellido, l.titulo, p.fecha_prestamo, p.estado
    FROM libro l
    INNER JOIN autor a ON l.id_autor = a.id_autor
    INNER JOIN prestamo p ON l.id_libro = p.id_libro
    INNER JOIN usuario u ON u.id_usuario = p.id_usuario WHERE u.id_usuario = ?`,
    [user],(err, result)=>{
        if (err) {
            console.error("¡ERROR! I can't show you the user's interactions :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the user's interactions :(" });
        };
        res.end(JSON.stringify(result))
    })
})

export default appCliente;