// ./index.js
// 1. IMPORTACIONES
const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./config/db")

// 2. MIDDLEWARES
// VARIABLES DE ENTORNO
require("dotenv").config()

// CONEXIÓN A LA BASE DE DATOS
connectDB()

// ACTIVAR CORS -  CROSS ORIGIN RESOURCE SHARING - PERMITE A OTROS SERVIDORES ACCEDER A ESTE SERVIDOR Y PODER TRANSFERIR DATOS ENTRE ELLOS DE UNA MANERA MÁS FLEXIBLE. NOS VA A PERMITIR ENTREGAR DATOS A REACT SIN RESTRICCIÓN
app.use(cors())

// TODAS LAS PETICIONES Y RETORNOS VAN A FLUIR EN UN FORMATO JSON
app.use(express.json({ extended: true }))


// 3. RUTAS
/** APP DE MASCOTAS - ADOPCIÓN
 * CRUD - CREAR - LEER - ACTUALIZAR - BORRAR DATOS
 * AUTENTICACIÓN CON AUTORIZACIÓN*/
app.use("/api/pets", require("./routes/pets.js"))
app.use("/api/users", require("./routes/users.js"))
app.use("/api/auth", require("./routes/auth.js"))


// 4. SERVIDOR
app.listen(process.env.PORT = 3005, () => {
    console.log("Nuestro servidor está activo")
})