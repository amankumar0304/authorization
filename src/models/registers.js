const mongoose = require('mongoose');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },tokens:[{
        token:{type:String,required:true}
    }]

})
employeeSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(e){
        res.send("Error"+e);
        console.log(e);
    }
}

employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})

const Register=new mongoose.model("Register",employeeSchema)
module.exports = Register;