const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
   
    email:{
        type:String,
        required:[true,"email is required and should be unique"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
},

    {timestamps:true}


)

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'jwtPrivateKey');
    return token;
  };
  

const User=mongoose.model("users",userSchema)

module.exports=User