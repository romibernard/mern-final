// ./routes/users.js

const express = require("express")
const router = express.Router()

const usersController = require("./../controllers/usersController")


// CRUD DE USUARIOS
// GET - USERS - OBTENER TODOS LOS USUARIOS PARA LOS ADMINS
/**
 * 1. SOLO LOS ADMINS PUEDEN ACCEDER A TODOS LOS USUARIOS
 * 2. PEDIR AUTENTICACIÓN DE ADMIN
 */



// POST - USER - CREAR UN USUARIO
router.post("/create", usersController.createUser)




// PUT - USER - ACTUALIZAR UN USUARIO
/**
 * - SOLO LOS MISMOS USUARIOS PUEDEN ACTUALIZAR SUS DATOS
 */



// DELETE - USER - BORRAR UN USUARIO
/**
 * - SOLO LOS ADMINS PUEDEN BORRAR AL USUARIO
 */


module.exports = router