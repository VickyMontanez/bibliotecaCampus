import {Router} from 'express';
import mysql from 'mysql';
import proxyUser from '../middleware/proxyUser.js';
const appPrestamo = Router();
let connection;

appPrestamo.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 5. List the loans made with the loan date
appPrestamo.get("/", (req,res)=>{
    connection.query('SELECT id_prestamo, fecha_prestamo, fecha_devolucion, estado FROM prestamo', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the loans :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the loans :(" });
        };
        res.end(JSON.stringify(result))
    });
});

//9.
appPrestamo.get("/prestados", (req,res)=>{
    connection.query(`
        SELECT  l.titulo AS libro, p.estado AS prestamo, p.fecha_devolucion AS fecha_devolucion
        FROM libro l
        INNER JOIN prestamo p
        ON l.id_libro = p.id_prestamo WHERE p.estado = "Prestado";`, (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the books currently checked out :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the books currently checked out :(" });
        };
        res.end(JSON.stringify(result))
    });
});

//15. Get the books checked out to a specific user (example: Maria Gomez).
appPrestamo.get("/:id", (req,res)=>{
    let usuario = req.params.id
    connection.query(`
        SELECT l.titulo, u.nombre, u.apellido, p.fecha_prestamo, p.fecha_devolucion
        FROM libro l
        INNER JOIN autor a ON l.id_autor = a.id_autor
        INNER JOIN prestamo p ON l.id_libro = p.id_libro
        INNER JOIN usuario u ON u.id_usuario = p.id_usuario WHERE u.id_usuario = ?`,
        [usuario],(err, result) => {
        if (err) {
            console.error("¡ERROR! I can't you the user who owes books :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't you the user who owes books :(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appPrestamo;