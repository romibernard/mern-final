// ./routes/pets.js
const express = require("express")
const router = express.Router()

const petsController = require("./../controllers/petsController")

// CRUD
// GET - PETS - OBTENER TODAS LAS MASCOTAS EN ADOPCIÓN
router.get("/get-all", petsController.getAllPets)


// POST - PETS - CREAR UNA MASCOTA PARA ADOPCIÓN
router.post("/create", petsController.createPet)


// PUT - PETS - ACTUALIZAR UNA MASCOTA SOBRE SUS DATOS Y EL ESTADO DE ADOPCIÓN
router.put("/update", petsController.updatePet)

//DELETE - PET - Borrando una mascota
router.delete("/delete", petsController.deletePet)

module.exports = router