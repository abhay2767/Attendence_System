const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT
const connect_Db = require('./Config/db')
const cors = require('cors')
const auth_router = require('./Router/Auth_Router');
const attendance_router = require('./Router/Attendance_Router')


app.use(cors())
app.use(express.json())


app.use('/api/', auth_router)
app.use('/api/', attendance_router)


connect_Db()


app.listen(PORT, ()=>{
    console.log("Server is started")
})