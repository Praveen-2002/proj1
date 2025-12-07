const UserModel = require("../mongoose/models/User.js")
const { compareHashedInput, hashInput } = require("../utils/hasing.js")

const {ValidatewithRegex} = require("../utils/regexHelper")

async function register(req,res){
    if (!req.body){
        return res.status(400).json({"error":"No body was passed"})
    }
    const {name, email, password, phone, dob} = req.body
    if(ValidatewithRegex(name,"name") && ValidatewithRegex(email, "email")&&
     ValidatewithRegex(password, "password") && ValidatewithRegex(phone,"phone")){

        const user = new UserModel({
            name,
            email,
            password: hashInput(password),
            phone,
            dob: new Date(dob)
        })

        try{
            await user.save()
        }
        catch(err){
            console.log(err)
            return res.status(500).json({eror: "Server down"})
        }
        return res.status(200).json({success:true})

     }
     return res.status(400).json({error:"Please enter valid details"})
}

async function login(req,res) {
    if (!req.body){
        return res.status(400).json({"error":"No body was passed"})
    }
    const {email, password} = req.body
    if(ValidatewithRegex(email,"email") && ValidatewithRegex(password,"password")){

        const user = await UserModel.findOne({"email":email})
        if (!user){
            return res.status(401).json({error: "Incorrect details"})
        }
        const isPasswordValid = compareHashedInput(password, user.password)

        return isPasswordValid ? res.status(200).json({success:true}) : res.status(401).json({error:"Incorrect Password"})
    }
    return res.status(400).json({error:"Please enter valid details"})
}

module.exports = {register, login}