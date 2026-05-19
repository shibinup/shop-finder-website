import express from 'express'
import { shopownerLogin, shopownerSignup, verifyOTP } from '../services/shopownerServices.js';
const router = express.Router();


const test=(req,res)=>{
    console.log("succes")
}

router.post("/signup",shopownerSignup)
router.post("/signup/verifyotp",verifyOTP)
router.post("/login",shopownerLogin)


export default router