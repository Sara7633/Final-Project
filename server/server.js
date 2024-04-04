
require("dotenv").config()
const express = require("express")
const app = express()

const cors = require("cors")
const corsOptions = require("./config/corsOptions")

const PORT = process.env.PORT || 2010
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))


app.use("/api/order",require("./routers/orderRouter"))
app.use("/api/product",require("./routers/productRouter"))
app.use("/api/user",require("./routers/userRouter"))
app.use("/api/auth",require("./routers/authRouter"))

app.get("/", (req, res) => {
    res.send("hello for world")
})

mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
    app.listen(PORT, () => {
        console.log(`server runnig on port ${PORT}`);
    })
})

mongoose.connection.on('error', err => {
    console.log(err);
})