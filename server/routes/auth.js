const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")

const authorization = require("./../middlewares/authorization")

const { check } = require("express-validator")

//RUTAS DE AUTENTICACIÓN - sirvne para entregar y verificar credenciales

// INICIAR SESIÓN - ENTREGAR CREDENCIALES
// POST - AUTH - VERIFICAR QUE EL USUARIO ES EL MISMO QUE CREÓ ESA CUENTA QUE EL "USUARIO" DICE TENER

router.post("/login", [
    check("email", "Ingresa un email válido").isEmail(),
    check("password", "No enviaste un password adecuado.").not().isEmpty()
], authController.loginUser)

//VERIFICAR TOKEN - usuario envió una credencial, hay que revisar que no está corrupta y que es correcta
router.get("/verifyingtoken", authorization, authController.verifyingToken)

module.exports = router