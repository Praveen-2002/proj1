const express  = require("express")
const {register, login} = require("../controller/userContoller.js")
const userRouter = express.Router()

userRouter.post("/register", async(req,res)=>{
    await register(req,res)
})

userRouter.post("/login", async(req,res)=>{
    await login(req,res)
})

module.exports = userRouter