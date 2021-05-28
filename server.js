const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const mongoose = require("mongoose");

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://admin-shubham:Shubham@123@cluster0.mq9xg.mongodb.net/farmerDB",{useNewUrlParser:true,useUnifiedTopology:true});

const userSchema = {
    name:{
      type:String,
      required:true
    },

    phone:{
      type:String,
      required:true

    },

    adhar:{
      type:String,
      required:true

    },
    address:{
      type:String,
      required:true

    },
    email:{
      type: String,
      required:true
    },
    password:{
      type:String,
      required:true
    }

};

const User = new mongoose.model("User",userSchema);

app.get("/", function(req,res){
    res.render("page1");
});

app.get("/login", function(req,res){
  res.render("login");
});

app.get("/register", function(req,res){
    res.render("register");
});


app.listen(process.env.port || 3000,function(req,res)
{
    console.log("server started ")
});

app.post("/register",function(req,res)
{
    const newUser = new User({
      name:req.body.name,
      phone:req.body.number,
      adhar:req.body.adhar,
      address:req.body.adress,
        email:req.body.username,
        password:req.body.password
    });

    newUser.save(function(err)
    {
        if(err)
        {
            console.log(err);
            res.render("errormessage");
        }
        else{
            res.render("login");
        }
    });

});

app.post("/login",function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username},function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("page3");
                }
                else{
                  res.render("error");
                }

            }
            else{
              res.render("error");
            }
        }
    })
});
app.get("/page3",function(req,res)
{
  res.render("page3");
})

app.get("/buyer",function(re,res)
{
  res.render("buyer");
});

app.get("/cart",function(req,res)
{
  res.render("cart");
})

app.get("/seller",function(req,res)
{
  res.render("seller");
})
app.get("/errormessage",function(req,res)
{
  res.render("errormessage");
})
