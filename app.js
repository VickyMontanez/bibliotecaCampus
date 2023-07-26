import express from "express";
import dotenv from 'dotenv';
import appCliente from './routers/cliente.js';
import appAutor from './routers/autor.js'
import appCategoria from "./routers/categoria.js";
import appEditorial from "./routers/editorial.js";
import appEstadoLibro from "./routers/estadolibro.js";
import appPrestamo from "./routers/prestamo.js";
import appReserva from "./routers/reserva.js";
import appLibro from "./routers/libro.js";

const appExpress = express();
dotenv.config();

appExpress.use(express.json());
appExpress.use("/usuarios", appCliente);
appExpress.use("/autores", appAutor);
appExpress.use("/categorias", appCategoria);
appExpress.use("/editoriales", appEditorial);
appExpress.use("/estadoLibro", appEstadoLibro);
appExpress.use("/prestamos", appPrestamo);
appExpress.use("/reservas", appReserva);
appExpress.use("/libros", appLibro)

const config = JSON.parse(process.env.MY_CONFIG);
appExpress.listen(config, ()=>{
  console.log(`http://${config.hostname}:${config.port}`);
})