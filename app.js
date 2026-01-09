const express = require('express');
const app = express();
const path = require('path');

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))


// "/"route
app.get("/",(req,res)=>{
res.render("index.ejs")
});




app.listen("3000",()=>{
  console.log("app is running at localhot:3000")
})