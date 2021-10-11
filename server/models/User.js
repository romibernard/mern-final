const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }

})


const User = mongoose.model("User", UsersSchema)

module.exports = User