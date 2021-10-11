const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator") //conjutno de errores o check de la ruta

const User = require("./../models/User")


exports.createUser = async (req, res) => {
    // REVISIÓN DE VALIDACIONES
    const errors = validationResult(req) //al momento de hacer mis checks, busca la propiedad de los errores.
    console.log(errors)
    if (!errors.isEmpty) {
        return res.status(400).json({
            msgError: errors.array()
        })
    }

    // PEDIR LOS DATOS DEL FORMULARIO
    const { username, email, password } = req.body

    // ENCRIPTACIÓN
    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username,
            email,
            hashedPassword
        })
        console.log(newUser)

        // SI EL USUARIO SE REGISTRÓ CORRECTAMENTE, NECESITO QUE YA NO TENGA QUE HACER UN LOGIN.

        // PROCESO DE JWT - AUTENTICACIÓN - ENTREGA DE CREDENCIAL
        // A. CREAR LOS DATOS QUE VAN A ESTAR ESCRITOS EN LA CREDENCIAL

        const payload = {
            user: {
                id: newUser._id
            }
        }

        // B. FIRMAR POR EL SERVIDOR LA CREDENCIAL
        jwt.sign(
            payload, // TODOS LOS DATOS DE LA CREDENCIAL
            process.env.SECRET, // FIRMA DEL SERVIDOR
            {
                expiresIn: 360000 // SEGUNDOS
            },
            (error, token) => {

                console.log(error)

                if (error) {
                    return res.status(401).json({
                        msgError: "Hubo un problema en la creación del token."
                    })
                }

                return res.json({
                    data: {
                        token
                    }
                })
            }
        )

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msgError: "Hubo un problema creando el usuario."
        })
    }
}