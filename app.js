require("dotenv").config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const userModel = require('./modles/user');
const postModel = require('./modles/post');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.get('/',(req,res)=>{
   
    res.render("index");
});

app.get('/login', (req,res)=>{
    res.render("login",{message:null});
    
});

app.get('/profile', isLoggedin,async (req,res)=>{
     let user  = await userModel.findOne({email: req.user.email}).populate("posts")
     res.render("profile",{user});
})

app.post('/login' , async(req,res)=>{
    let{email,password} = req.body;
    let user = await userModel.findOne({email});
   if(!user){
    return res.status(404).render('login',{ message:"Something went wrong"});
   }
   bcrypt.compare(password,user.password,function(err,result){
        if(result){
            const token =  jwt.sign({email:email ,userid: user._id}, 'secret');
             res.cookie('token' ,token);
            res.status(200).redirect('/profile');
        } else{
            res.render('login', {message: 'Something went wrong'});
        }
   })
          
})
 app.get('/logout' , (req,res)=>{
        res.cookie('token',"");
        res.redirect('/login');
 })


app.post('/register', async(req,res)=>{
    let{username,name,age,email,password} = req.body;
   let user = await userModel.findOne({email});
   if(user){
    return res.status(409).send("User already exists")
   }

   bcrypt.genSalt(10, async (err,salt)=>{
        bcrypt.hash(password,salt, async(err,hash)=>{
            let user =  await userModel.create({
                username,
                name,
                age,
                email,
                password:hash
             }) ;
            const token =  jwt.sign({email:email ,userid: user._id}, 'secret');
            res.cookie('token' ,token);
            res.redirect('profile');
        })
   })
       
   
});

app.post('/post',isLoggedin, async(req,res)=>{
let user = await userModel.findOne({email: req.user.email});
let{content} = req.body;
let post = await postModel.create({
    user: user._id,
     content
});
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');
})

function isLoggedin(req,res,next){
    if(req.cookies.token==='') return res.redirect("/login");
    else{
        let data = jwt.verify(req.cookies.token,'secret');
        req.user = data;
    } 
    next();
    

   }
    

app.listen(3000,(err)=>{
    console.log("Work");
})