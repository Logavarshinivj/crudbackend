
const express=require("express")
const app= express()
const cors= require("cors")
const dotenv=require('dotenv');
const connectDb=require("./db/connectDb")
dotenv.config()
app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:4000'      
    })
  );
  

const studentroute=require("./routes/studentroute.js")

app.use("/",studentroute)

connectDb()
const port=4000 || process.env.PORT 
app.listen(port,()=>console.log(`node Server started on ${port}🔥🔥🔥`))