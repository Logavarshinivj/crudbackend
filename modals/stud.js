const mongoose = require('mongoose')
const studSchema=mongoose.Schema(
    {
      name:{
        type:String,
       
      },
      age:{
        type:Number,
       
      },
      gender:{
        type:String,
       
      },
      img:{
        type:String,
       
      },
      tmark:{
        type:Number,
        
      },
      emark:{
        type:Number,
        
      },
      smark:{
        type:Number,
        
      },
      mmark:{
        type:Number,
        
      },
      somark:{
        type:Number,
        
      }
    }
)

const studModel=mongoose.model("students",studSchema);
module.exports=studModel;