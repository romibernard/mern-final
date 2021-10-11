// ./controllers/petsController.js

const Pet = require("./../models/Pet")


exports.getAllPets = async (req, res) => {

    try {

        const pets = await Pet.find({})

        console.log(pets)

        return res.json({
            data: pets
        })



    } catch (error) {

        console.log(error)

        return res.status(500).json({
            data: null,
            errorMsg: "Hubo un error interno. Estamos arreglándolo lo más pronto posible."
        })


    }


    res.json({
        data: "Hola mundo"
    })


}

exports.createPet = async (req, res) => {

    // OBTENER LOS DATOS DEL FORMULARIO
    const {
        name,
        pictureUrl,
        age,
        gender,
        isVaccinated,
        description
    } = req.body

    try {

        const newPet = await Pet.create({
            name,
            pictureUrl,
            age,
            gender,
            isVaccinated,
            description
        })

        res.json({
            data: newPet,
            msg: "Mascota en adopcion creada de manera exitosa."
        })


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            errormsg: "Hubo un error al crear a la mascota en adopción"
        })


    }


}

exports.updatePet = async (req, res) => {

    const {
        id,
        name,
        pictureUrl,
        age,
        gender,
        isVaccinated,
        description,
        availableForAdoption
    } = req.body


    try {

        const updatedPet = await Pet.findByIdAndUpdate(id, {
            name,
            pictureUrl,
            age,
            gender,
            isVaccinated,
            description,
            availableForAdoption
        }, { new: true }) // DEVUELVE LOS DATOS ACTUALIZADOS

        return res.json({
            data: updatedPet
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "Hubo un error actualizando la mascota."
        })

    }

}

exports.deletePet = async (req, res) => {

    const { id } = req.body

    try {

        const deletedPet = await Pet.findByIdAndRemove({ _id: id })

        return res.json({
            data: deletedPet,
            msg: "Esta mascota fue borrada exitosamente."
        })


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            msgError: "Hubo un error borrando la mascota."
        })

    }
}