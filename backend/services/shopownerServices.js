import Tempuser from "../models/tempUserschema.js";
import User from "../models/userSchema.js";
import { generateOTP } from "../utilities/otpgeneration.js";
import { sendOTPEmail } from "../utilities/sendOtp.js";
import bcrypt from "bcryptjs";
import generateToken from "../utilities/generateJwt.js";
import Shop from "../models/shopSchema.js";
import uploadToImgBB from "../utilities/uploadToImgbb.js";

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
    console.log("pass otp",otp)
    console.log("type of original",typeof otp)
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    
    //here setting a  tempuser in user database before otp verification
    const newUser = await Tempuser.create({
      name,
      email,
      password: password,
      otp:otp
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
   
      console.log("verify otp called ")
  try {
        const { email,password, otp } = req.body;
        console.log("eee",email,password,otp)
        console.log("enetred otp",otp)
        console.log("type of enetred otp is", typeof otp)
        
         const salt = await bcrypt.genSalt(10); 
         
          
         const user = await Tempuser.findOne({ email:email});
       

  if (!user) return res.status(400).json({ success:false,message: "User not found" });
  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch) {
    return res.status(401).json({ success:false , message: " password" });
}

   console.log("user.otp is ",user.otp)
  if (Number(user.otp) !== Number(otp)) {
    return res.status(400).json({ success:false,message: "Wrong OTP" });
  }

  
   const newUser = await User.create({
      name:user.name,
      email,
      password: user.password,
    });
    await Tempuser.deleteOne({ _id: user._id })

     const token = generateToken(newUser._id);
      console.log("token generated",token)

      res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
   console.log("cookie set")

  return res.json({
    success:true,
    message: "Account verified and signup successfully ",
  });
  } catch (error) {
    console.log("shibu have errror in verify otp",error)
     return res.status(400).json({
        success: false,
        message: error,
      });

  }


};


const shopownerLogin =async(req,res)=>{

     try {

        const{ email , password } = req.body


         const user = await User.findOne({ email });

        if (!user) {
         return res.status(400).json({
           success: false,
           message: "User not found",
      });
    }

    
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

      const token = generateToken(user._id);
      console.log("token is   ==",token)

      res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token,
    });


     } catch (error) {
      res.status(400).json({
        success: false,
        message : error
      })
     }



}


const addShop = async(req,res)=>{
   console.log("main api is called")
    try {
      const { images,shopName,email,password,category,phoneNumber,secondaryPhoneNumber,weblink,description,city } = req.body;
      const user =await User.findOne({email})
      //here checking enetred email is same in time of login
      if (!user) {
          return res.status(400).json({
           success: false,
           message: "Enter same email as you enetered",
      })};

          

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }


   // checking already have a shop 
   const shopexisting = await Shop.findOne({shopOwnerId:req.user._id})
   if(shopexisting){
          return res.status(400).json({
           success: false,
           message: "you have an shop with same email",
      })};



      // Uploaded files
        const files = req.files;
        


        // Validation
        if (!files || files.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Please upload at least one image",
            });
        }


        // Max 3 validation
        if (files.length > 3) {

            return res.status(400).json({
                success: false,
                message: "Maximum 3 images allowed",
            });
        }


        // Upload all images
        const uploadedImages = [];

        for (const file of files) {
            
            const { url, display_url, delete_url } = await uploadToImgBB(file);


            uploadedImages.push({ url,
  displayUrl: display_url,
  deleteUrl: delete_url,});
        }





    const shopOwnerId = req.user.id

      const newShop = await Shop.create({
        shopOwnerId:req.user._id,
        images:uploadedImages,
        shopName,
        email,
        password,
        category,
        phoneNumber,
        secondaryPhoneNumber,
        weblink,
        description,
        city

    })

    return res.status(201).json({

        shopName,
        email,
        password,
        category,
        phoneNumber,
        secondaryPhoneNumber,
        weblink,
        description,
        city,
        success:true,
        meassage : "shop created succesfully"

    })

    } catch (error) {
      console.log("shiii",error)
        return res.status(400).json({
        success: false,
        message: error,
      });
    }

}


const getMyshop =async(req,res)=>{
  console.log("get my shop called ")
  try {
    const user_id = req.user._id
    const shop= await Shop.findOne({shopOwnerId:req.user._id})
    if(!shop){
          return res.status(400).json({
           success: false,
           message: "this shop doesnot exist",
      })};

      return res.status(201).json({

           shop :{ name : shop.name,
           email :shop.email,
           category :shop.category,
           phoneNumber : shop.phoneNumber,
            secondaryPhoneNumber :shop.secondaryPhoneNumber,
            weblink : shop.weblink,
            description :shop.description,
            city :shop.city,
             images:shop.images,
             success:true,
             message : "this is your shop"}
      })
  } catch (error) {
    console.log("get my shop error",error)
     return res.status(400).json({
        success: false,
        message: error,
      });
  }
}

const updateShop = async (req, res) => {
  try {
    console.log("try from update shop called")
    const { shopName, category, phoneNumber, secondaryPhoneNumber, weblink, description } = req.body;
    const isChangedImages = req.body.isChanged === true || req.body.isChanged === "true";

    const existingShop = await Shop.findOne({ shopOwnerId: req.user._id });
    if (!existingShop) return res.status(404).json({ success: false, message: "Shop not found" });

    let updatedImages = existingShop.images;

    if (isChangedImages) {
      console.log("is changed imaged called")
      const files = req.files || [];

      // 1. Upload new images first
      const newImages = await Promise.all(
        files.map(async (file) => {
          const { url, display_url, delete_url } = await uploadToImgBB(file);
          return { url, displayUrl: display_url, deleteUrl: delete_url };
        })
      );

      // 2. Delete old images only after successful uploads
      await Promise.allSettled(
        existingShop.images.map((item) => fetch(item.deleteUrl))
      );

      updatedImages = newImages;
    }

    console.log("existing shop.images",existingShop.images)
    existingShop.set({ shopName, category, phoneNumber, secondaryPhoneNumber, weblink, description, images: updatedImages });
    const updatedShop = await existingShop.save();

    return res.status(200).json({ success: true, message: "Shop updated successfully", data: updatedShop });
  } catch (error) {
    console.error("updateShop error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" }); // Don't leak error.message to client
  }
};


export { shopownerSignup ,verifyOTP,shopownerLogin,addShop,getMyshop,updateShop}


/* 

     const [images, setImages] = useState([null, null, null]);
     const[shopName,setShopName]= useState("")
     const[category,setCategory] =useState("Grocery")
     const[phoneNumber,setPhoneNumber] = useState("")
     const[secondaryPhoneNumber,setSeconsaryPhoneNumber] = useState("")
     const[weblink,setWEblink] = useState("")
     const[description,setDescription] = useState("")


*/