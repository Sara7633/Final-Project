
const Order = require("../models/order")
const Product = require("../models/product")
const User = require("../models/user")

const getAllOrders = async (req, res) => {
    console.log("xxxxxxxxxxxxxxx    ",req.user.role);

    if (req.user.role == 'מנהל') {
        console.log("aa  ",req.user);
        const orders = await Order.find().populate("productsList.prod").populate("user", { password: 0 }).lean()
        res.json(orders)
    }
    else {
        console.log("bb ",req.user)
        const order = await Order.find({ user: req.user._id, complete: true }).populate("productsList.prod").populate("user", { password: 0 }).lean()
        res.json(order)
    }
}
const getBasket = async (req, res) => {
    const order = await Order.findOne({ user: req.user._id, complete: false }, { productsList: 1 }).populate("productsList.prod").lean()
    let prodList
    if (!order || !order.productsList)
        return res.json([])
    res.json(order.productsList)
    // prodList = await Promise.all(order.productsList.map(async (e) => {
    //     const p = await Product.findById({ _id: e.prod });
    //     return { prod: p, quantity: e.quantity }
    // }))
    // if (!prodList)
    //     return res.json([])
    // res.json(prodList)
}
const createNewOrder = async (req, res) => {
    const { userName, paid, productsList,price, payment, comments } = req.body
    if (req.user.role == 'מנהל') {
        const user = await User.findOne({ userName })
        if (!user)
            return res.status(400).json("userName not found ")
        const order = await Order.create({ user: user._id, paid, productsList, price, payment, comments })
        return res.json(order)
    }
    const order = await Order.create({ user: req.user._id, paid, productsList, price, payment, comments })
    res.json(order)
}

const getOrderById = async (req, res) => {

    const { _id } = req.params
    const order = await Order.find({ _id, user: req.user._id }).populate("user", { password: 0 }).lean()
    if (!order) {
        return res.status(400).json("order not found ")
    }
    res.json(order)
}

const updateOrder = async (req, res) => {
    const { _id, paid, productsList, payment, comment } = req.body
    if (!_id)
        return res.status(400).json("id is required")
    const order = await Order.findById({ _id }).populate("productsList.prod").exec()

    if (!order)
        return res.status(400).json(" order not found")
    let price = 0
    order.productsList.map(p => { price = price + p.prod.price * p.quantity })
    order.paid = paid
    order.price = price
    order.payment = payment
    order.productsList = productsList
    if (comment)
        if (order.comments.length > 0)
            order.comments = [...order.comments, comment]
        else order.comments = [comment]


    const myUpdateOrder = await order.save()
    res.json(myUpdateOrder)
}
const deleteOrder = async (req, res) => {
    const { _id } = req.body
    const order = await Order.findById(_id).exec()
    if (!order)
        return res.status(400).json("order not found")
    const result = await order.deleteOne()
    res.json(result)

}
const addProduct = async (req, res) => {
    const user = req.user._id
    const { prod, quantity } = req.body
    if (!prod)
        return res.status(400).json("prod is required")
    const order = await Order.findOne({ user, complete: false })
    if (order == null) {
        const newOrder = await Order.create({ user: req.user._id, productsList: [{ prod, quantity }], price: prod.price * quantity })
        return res.json(newOrder)
    }
    const myProd = order.productsList.find(a => a.prod._id == prod._id)
    if (myProd) {
        myProd.quantity = Number(myProd.quantity) + Number(quantity)
    }
    else
        order.productsList = [...order.productsList, { prod, quantity }]


    const updateOrder = await order.save()
    res.json(updateOrder)

}
const addProductValue = async (req, res) => {
    const order = await Order.findOne({ user: req.user._id, complete: false }, { productsList: 1 })
    const { prod, quantity } = req.body
    if (!order || !prod || quantity == null)
        return res.status(404).json([])
    const myProd = order.productsList.find(e => e.prod._id == prod)
    if (quantity == 0) {
        myProd.deleteOne()
    }
    else myProd.quantity = quantity
    const updateOrder = await order.save()
    res.json(updateOrder)
}


const addComment = async (req, res) => {
    const { _id, comment } = req.body
    if (!_id || !comment)
        return res.status(400).json("id and comment are required")
    const order = await Order.findById(_id)
    if (!order)
        return res.status(400).json("order not find")
    order.comments = [...order.comments, comment]
    const updateOrder = await order.save()
    res.json(updateOrder)

}

const completeOrder = async (req, res) => {
    const user = req.user._id
    const { payment, price, comment } = req.body
    if (!user)
        return res.status(400).json("id is required")
    const order = await Order.findOne({ user, complete: false })
    if (!order)
        return res.status(400).json("order not find")
    order.complete = true
    order.payment = payment
    order.price = price
    order.comments = [...order.comments, comment]
    const updateOrder = await order.save()
    res.json(updateOrder)

}
const conclude = async (req, res) => {

    const orders = await Order.find().populate("productsList.prod").lean()
    const products = await Product.find().lean()
    if (!orders || !products) {
        return res.status(400).json("not found ")
    }
    let price = 0
    orders.map(e => price = price + e.price);

    let prodJson = []
    products.map(e => {
        prodJson.push({ [e.name]: 0 })
    })

    // orders.map(e=>{
    //     products.map(e=>{
    //         if()
    //     })
    // })
    // let data={price:0,payment:{check:0,cash:0,nedarim:0},products:{}}
    res.json(orders)
}
module.exports = {
    getAllOrders,
    createNewOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    addProduct,
    addComment,
    getBasket,
    completeOrder,
    addProductValue,
    conclude
}