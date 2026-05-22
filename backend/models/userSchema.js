import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type : String,
    unique : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

    });
  
// here hashing password



const User = mongoose.model("User", userSchema);
export default User