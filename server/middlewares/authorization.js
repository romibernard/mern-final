// ./middlewares/authorization.js
// ESTE ARCHIVO ME VA A SERVIR PARA DESENCRIPTAR EL TOKEN Y QUE COINCIDA CON MI PALABRA SECRETA

// 1. IMPORTACIONES
const jwt = require("jsonwebtoken")


// 2. FUNCIÓN
const unlockingToken = (req, res, next) => {

    const token = req.header("x-auth-token")

    if (!token) {
        return res.status(401).json({
            msgError: "No hay un token o es erróneo. Permiso no válido."
        })
    }


    try {
        const openToken = jwt.verify(token, process.env.SECRET)

        req.user = openToken.user

        next()

    } catch (error) {

        console.log(error)

        res.status(500).json({
            msgError: "Hubo un error en el proceso de token."
        })

    }




}

// 3. EXPORTACIÓN
module.exports = unlockingToken