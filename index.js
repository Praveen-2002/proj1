const express = require("express")
const cors = require("cors")

const userRouter = require("./routes/userRoute.js")
const applicationRouter = require("./routes/applicatonRoute.js")
require("./mongoose/moongodb.js")

const app = express()
app.use(cors({
    origin: "*"
}))

app.use("/api/application", applicationRouter)
app.use(express.json())
app.use("/api/users",  userRouter)
app.listen(3000,()=>{
    console.log("Server is up and running")
})