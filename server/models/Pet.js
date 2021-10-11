// ./models/Pet.js

// 1. IMPORTACIONES
const mongoose = require("mongoose")


// 2. SCHEMA
const petsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    },
    isVaccinated: {
        type: Boolean,
        required: true,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    availableForAdoption: {
        type: Boolean,
        required: true,
        default: true
    }
})

// 3. MODELO
const Pet = mongoose.model("Pet", petsSchema)

// 4. EXPORTACIÓN
module.exports = Pet