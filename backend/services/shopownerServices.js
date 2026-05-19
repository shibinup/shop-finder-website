import Tempuser from "../models/tempUserschema.js";
import User from "../models/userSchema.js";
import { generateOTP } from "../utilities/otpgeneration.js";
import { sendOTPEmail } from "../utilities/sendOtp.js";
import bcrypt from "bcryptjs";

const shopownerSignup = async(req,res)=>{
    console.log("called")
    console.log("req body iss",req.body)
    try {
            // 1. Get data from frontend
    const { name, email, password } = req.body;

    // 2. Check all fields entered
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    const existingUser = await User.findOne({ email });
  

    
   if (existingUser ) {
     return res.status(400).json({
    success: false,
    message: "User already exists",
     });

  }

  const tempexistingUser = await Tempuser.findOne({ email });
     if (tempexistingUser ) {
     return res.status(400).json({
      success: false,
       message: "try after 30 seconds",
     });

  }


  
    const otp =  generateOTP()
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    
    //here setting a  tempuser in user database before otp verification
    const newUser = await Tempuser.create({
      name,
      email,
      password: password,
    });

    //here sending otp
     await sendOTPEmail(email,otp)
     console.log("finih register work")




      return res.status(201).json({
      success: true,
      message: "temporary user creayed successful",
      user: newUser,
      isVerified:false,
      otp:otp,
      otpExpiry:otpExpiry
    })

    } catch (error) {
        console.log("shiu error is ",error)
        return res.status(400).json({
        success: false,
        message: "have error",
      });
    }
}

const verifyOTP = async (req, res) => {
   

  try {
        const { email,password, otp } = req.body;
        
         const salt = await bcrypt.genSalt(10); 
          const hashedPassword = await bcrypt.hash(password, salt); 
         const user = await Tempuser.findOne({ email:email,password:hashedPassword });

  if (!user) return res.json({ success:false,message: "User not found" });


  if (user.otp !== otp) {
    return res.json({ message: "Wrong OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  
  
   const newUser = await User.create({
      name:user.name,
      email,
      password: password,
    });
    await Tempuser.deleteOne({ _id: user._id })

  return res.json({
    success:true,
    message: "Account verified successfully ",
  });
  } catch (error) {
    console.log("shibu have errror in verify otp",error)
     return res.status(400).json({
        success: false,
        message: error,
      });

  }


};


export { shopownerSignup ,verifyOTP }
