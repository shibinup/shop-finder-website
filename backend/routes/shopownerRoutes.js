import express from 'express'
import { addShop, getMyshop, shopownerLogin, shopownerSignup, updateShop, verifyOTP } from '../services/shopownerServices.js';
import protect from '../utilities/protection.js';
const router = express.Router();


const test=(req,res)=>{
    console.log("succes")
}

router.post("/signup",shopownerSignup)
router.post("/signup/verifyotp",verifyOTP)
router.post("/login",shopownerLogin)
router.post("/addShop",protect,addShop)
router.get("/getMyshop",protect,getMyshop)
router.patch("/updateShop",protect,updateShop)


export default router