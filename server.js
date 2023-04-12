
const express=require("express")
const app= express()
const cors= require("cors")
const dotenv=require('dotenv');
dotenv.config()
app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:4000'      
    })
  );
  
const dbConfig= require("./db")
const studentroute=require("./routes/studentroute.js")

app.use("/",studentroute)
// app.use(cors())
const port=4000 || process.env.PORT 
app.listen(port,()=>console.log(`node Server started on ${port}🔥🔥🔥`))