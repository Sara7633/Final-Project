const express = require("express")
const router = express.Router()


const productController=require("../controller/productController")
router.get("/",productController.getAllProduct)
router.get("/:_id",productController.getProductById)
router.post("/",productController.createNewProduct)
router.put("/",productController.updateProduct)
router.delete("/",productController.deleteProduct)

module.exports=router