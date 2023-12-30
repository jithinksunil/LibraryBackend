const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')
const adminRoutes=require('./routes/adminRoute')
const userRoutes=require('./routes/userRoute')
const bookRoutes=require('./routes/bookRoute')
const dbconnect=require('./config/connection')


const PORT=process.env.PORT;
dotenv.config()


app.use(express.urlencoded({extended:true}))
app.use(express.json())

dbconnect.dbconnect()

app.use(morgan('dev'))

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT,()=>{
    console.log(`server is running  on http://localhost:${PORT}`);
})