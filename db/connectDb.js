
const mongoose=require("mongoose")
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongodb connected")
    }
    catch{
        console.log("error")
    }
}

module.exports=connectDb