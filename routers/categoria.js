import {Router} from 'express';
import mysql from 'mysql';
/* import proxyUser from '../middleware/proxyUser.js'; */
const appCategoria = Router();
let connection;

appCategoria.use((req, res, next) => {
    const config = JSON.parse(process.env.MY_CONNECT)
    connection = mysql.createPool(config);
    next();
});

// 2. List all available categories.
appCategoria.get("/", (req,res)=>{
    connection.query('SELECT * FROM categoria', (err, result) => {
        if (err) {
            console.error("¡ERROR! I can't show you the categories :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the categories :(" });
        };
        res.end(JSON.stringify(result))
    });
});

//12. Get the books of a certain category (example: Novel)
appCategoria.get("/:name", (req, res)=>{
    let categ = req.params.name;
    connection.query(`
        SELECT titulo AS libro, c.nombre AS categoria
        FROM libro l
        INNER JOIN categoria c ON l.id_categoria = c.id_categoria
        WHERE c.nombre = ?`,
        [categ], (err, result)=>{
        if (err) {
            console.error("¡ERROR! I can't show you the books on this category :(", err);
            return res.status(500).json({ mensaje: "¡ERROR! I can't show you the books on this category :(" });
        };
        res.end(JSON.stringify(result))
    });
});
export default appCategoria;