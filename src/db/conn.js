const mongoose = require('mongoose')
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((e)=>{
    console.log("Unsucceful Connection "+e)
})

