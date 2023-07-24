import {Router} from 'express';
import mysql from 'mysql';
const appLibro = Router();
let connection;

appLibro.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 7. Show all books with their title, author and publisher.
appLibro.get("/", (req,res)=>{
    connection.query(`
        SELECT  l.titulo AS titulo, a.nombre AS autor, e.nombre AS editorial
        FROM autor a 
        INNER JOIN libro l
        ON a.id_autor = l.id_autor
        INNER JOIN editorial e
        ON l.id_editorial = e.id_editorial`, (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the info of the books :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the info of the books:(" });
        };
        res.end(JSON.stringify(result))
    });
});

export default appLibro;