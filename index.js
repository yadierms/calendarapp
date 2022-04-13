const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

// console.log(process.env);

// crear servidor de express
const app = express();

// conexion a base de datos
dbConnection();

// cors
app.use(cors());

// escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

// Lectura y parseo del Body
app.use(express.json());

// Directorio Publico
app.use(express.static("public"));

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
