const express = require("express")
const router = express.Router()
const verifyJWT=require("../middlewere/verifyJWT")

const orderController=require("../controller/orderController")
router.get("/",verifyJWT,orderController.getAllOrders)
router.get("/basket",verifyJWT,orderController.getBasket)
router.get("/:_id",verifyJWT,orderController.getOrderById)
router.post("/",verifyJWT,orderController.createNewOrder)
router.delete("/",verifyJWT,orderController.deleteOrder)
router.put("/addProduct",verifyJWT,orderController.addProduct)
router.put("/addProductValue",verifyJWT,orderController.addProductValue)
router.put("/complete",verifyJWT,orderController.completeOrder)
router.put("/comment",verifyJWT,orderController.addComment)
router.put("/:_id",verifyJWT,orderController.updateOrder)

module.exports=router