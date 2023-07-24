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

export default appCategoria;