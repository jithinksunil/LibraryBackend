const express=require('express')
const app=express()
const mongoose=require('mongoose')
const morgan=require('morgan')
const cors=require('cors')
const dotenv=require('dotenv')

const dbconnect=require('./config/connection')


const PORT=process.env.PORT || 8080;
dotenv.config()


app.use(express.urlencoded({extended:true}))
app.use(express.json())

dbconnect.dbconnect()

app.use(morgan('dev'))



app.listen(PORT,()=>{
    console.log(`server is running  on http://localhost:${PORT}`);
})