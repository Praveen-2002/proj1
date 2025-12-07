const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    }
})

const UserModel = mongoose.model("User", User)

module.exports = UserModel