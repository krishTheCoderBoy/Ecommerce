import express from "express";
import { registerController,loginController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js";
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
//router object
const router=express.Router()
//routing
router.post("/register",registerController);
//login//post
router.post("/login",loginController)
// Forgot PAssword|| POST

router.post("/forgot-password",forgotPasswordController)
//test
router.get("/test",requireSignIn,isAdmin,testController)
// protected route
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})
// Admin route
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders',requireSignIn,getOrdersController)
//all-orders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)
export default router;