const mongoose = require('mongoose')
const MONGO_URI = "mongodb+srv://dubeyabhay2767:cZMHfubwg9kfQn1q@abhayfreecluster.w1yoaak.mongodb.net/abhayfreecluster?retryWrites=true&w=majority"

const connect_Db = ()=>{
    const connectParems = {
        useNewUrlParser: true,
    };
    mongoose.connect(MONGO_URI,connectParems)
    .then(()=>{
        console.log("Successfully connected to database..")
    }).catch((err)=>{
        console.log("Con't connect to database "+err)
    })
}

module.exports = connect_Db