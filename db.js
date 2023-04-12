const mongoose = require('mongoose')
const MONGOURL="mongodb+srv://varshinivj:Varshu08@cluster0.wm3pj8k.mongodb.net/crud"
// mongodb+srv://varshinivj:<password>@cluster0.wm3pj8k.mongodb.net/test

mongoose.connect(MONGOURL, {useUnifiedTopology: true,useNewUrlParser:true} )

var connection=mongoose.connection

connection.on('error',()=>{
    console.log("Mongodb connection failed")
})

connection.on("connected",()=>{
    console.log("Mongodb connection connected")
})

module.exports =mongoose