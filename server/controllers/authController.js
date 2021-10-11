//1. IMPORTACIONES
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/User")

//2. CONTROLLERS
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // 1. VERIFICAR QUE EL USUARIO EXISTA EN BASE DE DATOS
        let foundUser = await User.findOne({ email })

        // VALIDACIÓN - SI NO ENCUENTRA AL USUARIO...
        if (!foundUser) {
            return res.status(400).json({
                msgError: "El usuario o la contraseña son incorrectas."
            })
        }

        // SI TODO MARAVILLOSO, CANTAMOS JUNTOS Y AVANZAMOS
        console.log("Usuario encontrado:", foundUser)

        // 2. VERIFICAR CONTRASEÑA
        const verifiedPassword = await bcryptjs.compare(password, foundUser.hashedPassword)

        // SI EL PASSWORD NO COINCIDE...
        if (!verifiedPassword) {
            return res.status(400).json({
                msgError: "El usuario o el password son incorrectos"
            })
        }

        // SI TODO COINCIDE, ENTONCES, ENTRÉGALE SU CREDENCIAL TOKEN
        // A. PAYLOAD
        const payload = {
            user: {
                id: foundUser._id
            }
        }

        // B. FIRMA
        jwt.sign(
            payload,
            "holamundo",        //process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                console.log(error)

                if (error) {
                    return res.status(401).json({
                        msgError: "Hubo un problema en la creación del token."
                    })
                }

                // C. ENTREGA DEL TOKEN (RESPUESTA)
                return res.json({
                    data: {
                        token
                    }
                })
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msgError: "Hubo un problema creando el usuario."
        })
    }
}

exports.verifyingToken = async (req, res) => {
    try {

        const userData = await User.findById(req.user.id).select("-hashedPassword")

        return res.json({
            data: {
                user: userData
            }
        })


    } catch (error) {

        console.error(error)

        return res.status(500).json({
            msgError: "Hubo un error en la búsqueda del usuario."
        })

    }


    res.send("verificando el token")

}
