const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('../service/mail');


function sendEmailToUser(to, body) {
    mailer.sendEmail(to, body)
        .then(info => {
            console.log('Email sent: ', info.response);
        })
        .catch(error => {
            console.log('Error sending email: ', error);
        });
}
const email=async(req,res)=>{
    const {userName}=req.body;
    const {email}=await User.findOne({userName}).lean()
    console.log(email);
    if(!email)
        return res.status(404).send("user not found")
    const code=Math.round(Math.random()*10000000) 
    console.log(code);
    sendEmailToUser(email,"קוד האימות שלך הוא:\n"+code)
    return res.json({code})
}


const login = async (req, res) => {
    console.log("rrrrrrrrrrr   ",req.body);
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(404).json({ message: "All fields are required" })
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "Unauthorized" })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: "Unauthorized" })
    const userInfo = { _id: foundUser._id, userName: foundUser.userName, role: foundUser.role }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken, role: foundUser.role })
}

const register = async (req, res) => {
    const { userName, password, email, phone, address } = req.body
    if (!userName || !password)
        return res.status(404).json({ message: "All fields are required" })
    const duplicate = await User.findOne({ userName })
    if (duplicate)
        return res.status(404).json({ message: "Duplicate userName" })
    const hushPwd = await bcrypt.hash(password, 10)
    const userObj = { address, email, userName, phone, password: hushPwd }
    const user = await User.create(userObj)

    if (!user)
        return res.status(400).json({ message: "Invalid user received" })
    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken, role: "User" })
}
module.exports = { login, register,email }