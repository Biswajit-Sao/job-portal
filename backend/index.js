import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path'
const app=express();

const _dirname=path.resolve()

dotenv.config()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,  
};

app.use(cors(corsOptions));




app.use("/api/v1/user",userRouter)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)





app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"Hello I am satart Form backend",
        sucess:true
    })
})

app.use(express.static(path.join(_dirname,"/frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(_dirname,'frontend','build','index.html'))
})


const PORT=process.env.PORT || 8000; 

app.listen(PORT,()=>{
    connectDB()
    console.log(`The server in runing in PORT :${PORT} 👍`)
})                                                               