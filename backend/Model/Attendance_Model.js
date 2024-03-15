const mongoose = require('mongoose')

const attendance_schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_Model', //'User'- this is 'User' model
        required:true,
    },
    inSide:{
        type:Boolean,
        default:false
    },
    timestamp:{
        type:Date,
        default:Date.now,
        required:true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp),
    }
})

const attendance_data = new mongoose.model('Attendance',attendance_schema)

module.exports = attendance_data