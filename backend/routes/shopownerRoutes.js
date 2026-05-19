import express from 'express'
import { shopownerSignup } from '../services/shopownerServices.js';
const router = express.Router();


const test=(req,res)=>{
    console.log("succes")
}

router.post("/signup",shopownerSignup)

export default router