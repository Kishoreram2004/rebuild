import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const PORT =  process.env.PORT || 9000;

const app = express();

app.get("/",(req,res)=>{
    res.send("home page");
})

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    connectToMongoDB()
    console.log(`running in port ${PORT}`)
})
