const express = require("express")
const router = express.Router()
const userController=require("../controller/userController")
const verifyJWT=require("../middlewere/verifyJWT")

router.get("/",verifyJWT,userController.getAllUsers)
router.get("/:_id",verifyJWT,userController.getUserById)
router.post("/",verifyJWT,userController.createNewUser)
router.put("/",verifyJWT,userController.updateUser)
router.delete("/:_id",verifyJWT,userController.deleteUser)

module.exports=router