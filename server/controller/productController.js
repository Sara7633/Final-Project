
const Product = require("../models/product")
const Order=require("../models/order")
const getAllProduct = async (req,res) => {
    const product = await Product.find().lean()
    if (!product?.length)
        return res.status(400).json("not found product")
    res.json(product)
}

const createNewProduct = async (req,res) => {
    const {name,price} = req.body
    if (!name) {
        return res.status(400).json(" name is required")
    }
    const product = await Product.create({name,price})
    res.json(product)
}

const getProductById = async (req,res) => {
    const {_id} = req.params
    const product = await Product.findById(_id).lean()
    if (!product) {
        return res.status(400).json(" not founf product")
    }
    res.json(product)
}

const updateProduct = async (req,res) => {
    const { _id,name,price } = req.body
    if (!_id ||!name)
        return res.status(400).json(" name and id is required")
    const product = await Product.findById(_id).exec()
    if (!product)
        return res.status(400).json(" product not found")
    product.name = name
    product.price = price
    const myUpdateProduct = await product.save()
    res.json(myUpdateProduct)
}
const deleteProduct = async (req,res)=> {
    const {_id}=req.body
    const allOrders=Order.find({},{productsList:1}).lean()
    const found=(await allOrders).find(e=>e.productsList.find(p=>p.prod._id==_id))
    if(found){
        return res.status(404).json({messege:"user ordered this product"})
    }
    const product=await Product.findById(_id).exec()
    if(!product)
        return res.status(400).json(" not found product")
    const result=await product.deleteOne()
    res.json(result)
 
}

module.exports = {
    getAllProduct,
    createNewProduct,
    getProductById,
    updateProduct,
    deleteProduct
}