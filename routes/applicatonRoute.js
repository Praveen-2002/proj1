const express = require("express");
const multer = require("multer")
const fs = require("fs")
const applicationRouter = express.Router();
const {addApplication, updateApplicationStatus} = require("../controller/applicationController.js")

const diskstorage = multer.diskStorage({
    filename: (req,fileName,cb)=>{
        cb(null, req.file.originalname + new Date().toString())
    },
    destination: (req,dest,cb)=>{
        const localDest = "C:/Users/prave/OneDrive/Desktop/Wings-1/backend-Validation/public/" + new Date().getFullYear() + new Date().getMonth + new Date().getDay()
        fs.mkdirSync(localDest, { recursive: true })
        cb(null, localDest)
    }
})
const applicatonDocs = multer({ storage: diskstorage })

applicationRouter.post("/", applicatonDocs.any() ,async(req,res)=>{
    await addApplication(req,res)
})

// admin route
applicationRouter.use(express.json())
applicationRouter.post("/:id/review", async(req,res)=>{
    await updateApplicationStatus(req,res)
})
module.exports = applicationRouter