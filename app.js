import express from "express";
import dotenv from 'dotenv';
import appCliente from './routers/cliente.js';
import appAutor from './routers/autor.js'
import appCategoria from "./routers/categoria.js";
import appEditorial from "./routers/editorial.js";
import appEstadoLibro from "./routers/estadolibro.js";
const appExpress = express();
dotenv.config();

appExpress.use(express.json());
appExpress.use("/campus", appCliente);
appExpress.use("/autores", appAutor);
appExpress.use("/categorias", appCategoria);
appExpress.use("/editoriales", appEditorial);
appExpress.use("/estadoLibro", appEstadoLibro)

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{
  console.log(`http://${config.hostname}:${config.port}`);
})