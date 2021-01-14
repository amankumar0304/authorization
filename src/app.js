require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const Register=require('./models/registers')
const path = require("path")
const hbs=require('hbs');
const bcrypt=require('bcryptjs');


const static_path =path.join(__dirname,"../public")
const templates_path =path.join(__dirname,"../templates/views")
const partials_path =path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({entended:false}))
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views",templates_path)
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.post("/register",async (req,res)=>{
    try {
        const registerEmployee=new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
        })
        const token= await registerEmployee.generateAuthToken();
        const registered=await registerEmployee.save();
        res.status(201).render("index")
    }
    catch (e) {
        res.status(400).send("Error agyi hain")
    }

})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.post("/login",async(req,res)=>{
    try {
         const email = req.body.email;
         const password = req.body.password;
         const userEmail=await Register.findOne({email:email});
         const isMatch=await bcrypt.compare(password, userEmail.password);

         if(isMatch){
             res.status(201).render("index")
         }
         else{
             res.send("Invalid Details!")
         }

    }
    catch (e) {
        res.status(400).send("Invalid Details!")
    }
})
app.listen(process.env.PORT|| 3000,()=>{
    console.log("server listening");
})