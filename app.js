const express = require('express');
const app = express();
const path = require('path');
const userModel=require("./models/user");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))


// "/"route
app.get("/",(req,res)=>{
res.render("index.ejs")
});

//reading form data
app.get("/read",async (req,res)=>{
  let alluser=await userModel.find({});
  res.render("read.ejs",{user:alluser})
}
)
//creating a user
app.post("/create",async (req,res)=>{
  let {name,email,image}=req.body;
  let createduser=await userModel.create({
    name,
    email,
    image
  });
  res.redirect("/read")

})

//deleting a user
app.get("/delete/:id",async (req,res)=>{
  let userid=req.params.id;
  await userModel.findByIdAndDelete(userid);
  res.redirect("/read")
})

//editing a user
app.get("/edit/:id",async (req,res)=>{
  let userid=req.params.id;
  let user=await userModel.findById(userid);
  res.render("edit.ejs",{user})
})
//updating a user
app.post("/update/:id", (req,res)=>{
  let userid=req.params.id;
  let  {name,email,image} = req.body;
  userModel.findByIdAndUpdate(userid,{
    name,
    email,
    image
  }).then(()=>{
    res.redirect("/read")
  })
})

//listening to server
app.listen("3000",()=>{
  console.log("app is running at localhot:3000")
})