import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const protect = async (req, res, next) => {
    console.log("protection midlleware called")
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get Token
      token = req.headers.authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Find User (without password)
      const user = await User.findById(decoded.id).select("-password");

      // User not found
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      console.log("shibu find user and name is ",user.name)

      // Attach user to request
      req.user = user;

      return next();
    }

    // No token
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  } catch (error) {
    console.error("JWT Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

export default protect;