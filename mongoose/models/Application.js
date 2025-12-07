const mongoose = require("mongoose")

const application = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },

    address: {
        line1: String,
        pincode: String,
        city: String,
        State: String
    },

    education: [{
        degree: String,
        yearsOfPassing: Number,
        cgpa: String
    }],

    experience: [{
        company: String,
        years: Number
    }],

    documents: {
        aadhar: String,
        Photo: String
    },

    status:{
        type: String,
        default: "in_review"
    }
})

const ApplicationModel = mongoose.model("Application", application)

module.exports = ApplicationModel