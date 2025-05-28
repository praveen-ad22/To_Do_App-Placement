const express=require('express')
require('dotenv').config()
const passport=require('passport')
const app=express()
const verifytoken =require('./middleware/verifyToken')
const mongoose=require('mongoose');
const passportconfig=require('./middleware/passport')
const cors=require('cors')
const authRoutes=require('./Routes/authRoutes')
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(passport.initialize())
app.use('/auth',authRoutes)
app.use('/tasks',verifytoken,require('./Routes/TaskRoute'))

mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log(error)
})