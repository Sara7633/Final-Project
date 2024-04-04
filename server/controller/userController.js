const User = require("../models/user")
const bcrypt = require('bcrypt')


const getAllUsers = async (req, res) => {
    const user = await User.find({}, { password: 0 }).lean()
    if (!user?.length)
        return res.status(400).json("not found user")
    res.json(user)
}

const createNewUser = async (req, res) => {
    console.log("bbbbb  " + req.body.userName + ' ' + req.body.email);
    const { userName, email, phone, role } = req.body
    const password = "1234"
    if (!['משתמש', 'מנהל'].includes(role) && role)
        return res.status(201).json("role isn't valid")
    const findUserName = await User.find({ userName }).lean()
    if (findUserName?.length)
        return res.status(201).json(" userName must be unique")
    const user = await User.create({ userName, password, email, phone, role })
    res.json({ userName, email, phone, role })
}

const getUserById = async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id, { password: 0 }).lean()
    if (!user)
        return res.status(400).json("user not found")
    res.json(user)
}

const updateUser = async (req, res) => {
    const { _id, userName, password, email, phone, role } = req.body
    if (!userName) { return res.status(400).json(" userName & password are required") }

    let user
    if (_id) {
        if (role && !['משתמש', 'מנהל'].includes(role))
            return res.status(201).json("role isn't valid")
        const arrUserName = (await User.find().lean()).filter(e => { e.userName != userName; return e.userName })
        if (arrUserName.includes(userName))
            return res.status(201).json(" userName must be unique");
        user = await User.findById(_id, { password: 0 }).exec()
        if (!user)
            return res.status(400).json(" user not found")

        user.userName = userName
        if (password) {
            console.log(password, "   pas");
            const hushPwd = await bcrypt.hash(password, 10)
            user.password = hushPwd
        }

        if (email)
            user.email = email
        if (phone)
            user.phone = phone
        if (role)
            user.role = role
        return res.json({ _id, userName, email, phone, role })
    }
    
        user = await User.findOne({ userName }).exec()
        if (!user)
            return res.status(400).json(" user not found")
        const hushPwd = await bcrypt.hash(password, 10)
        user.password = hushPwd
        const myUpdateUser = await user.save()
        console.log(myUpdateUser);
        return res.json({userName })
    }
    

const deleteUser = async (req, res) => {
    const { _id } = req.params
    const user = await User.findById(_id).exec()
    if (!user)
        return res.status(400).json("user not found")
    const result = await user.deleteOne()
    res.json(result)

}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}