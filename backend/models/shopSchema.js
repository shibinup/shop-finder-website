import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({

shopOwnerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

city :{
    type:String,
    required:true
},
shopName: {
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

 category:{
    type :String,
    required:true
 },
phoneNumber:{
    type :Number,
    required:true
},
secondaryPhoneNumber:{
    type :String,
    required:true
},
weblink:{
    type :String,
},
description:{
    type :String,
    required:true
},
images:{
    type:[String],
    required:true
},
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

const Shop = mongoose.model("Shop",shopSchema)
export default Shop


/* 

          const [images, setImages] = useState([null, null, null]);
          const[shopName,setShopName]= useState("")
          const[email,setEmail] = useState("")
          const[password,setPassword] = useState("")
          const[category,setCategory] =useState("Grocery")
          const[phoneNumber,setPhoneNumber] = useState("")
          const[secondaryPhoneNumber,setSeconsaryPhoneNumber] = useState("")
          const[weblink,setWEblink] = useState("")
          const[description,setDescription] = useState("")


*/