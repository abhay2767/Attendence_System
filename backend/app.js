const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT
const connect_Db = require('./Config/db')
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is Home page")
})

connect_Db()

app.listen(PORT, ()=>{
    console.log("Server is started")
})