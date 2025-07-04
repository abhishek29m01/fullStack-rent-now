require("dotenv").config();
const express=require('express')
const mongoose=require('mongoose')
const pgRoutes=require('./Routes/pgRoutes')
const authRoutes=require('./Routes/authRoutes')
const metaRoutes=require('./Routes/metaRoutes')
const reviewsRoutes=require('./Routes/reviewsRoutes')
const cors=require('cors')
// connect mongoDb 
mongoose.connect("mongodb://localhost:27017/rent-now-database");
//middleware
const app=express();
// parse 
app.use(cors());
app.use(express.json()); 
app.use("/uploads",express.static("uploads"));

app.use("/",pgRoutes);
app.use("/",authRoutes);
app.use("/",metaRoutes);
app.use("/",reviewsRoutes)

app.listen(2001,()=>{
    console.log("Server running on port 2001")
})
