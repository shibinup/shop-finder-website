import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const protect = async (req, res, next) => {
  console.log("Protection middleware called");
  
  try {
    const token = req.cookies?.token;
    console.log("Token from cookie:", token);

    // 1. Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authorized, no token" 
      });
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Find User (without password)
    const user = await User.findById(decoded.id).select("-password");

    // 4. User not found
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    console.log("User found, name is:", user.name);

    // 5. Attach user to request and move to next middleware
    req.user = user;
    return next();

  } catch (error) {
    console.error("JWT Auth Error:", error.message);
    return res.status(401).json({ 
      success: false, 
      message: "Not authorized, token failed" 
    });
  }
};

export default protect;
