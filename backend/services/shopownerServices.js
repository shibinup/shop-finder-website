import User from "../models/userSchema.js";

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

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    
 

    const newUser = await User.create({
      name,
      email,
      password: password,
    });
    
      return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser,
    })

    } catch (error) {
        console.log("shiu error is ",error)
        return res.status(400).json({
        success: false,
        message: "have error",
      });
    }
}
export { shopownerSignup }
