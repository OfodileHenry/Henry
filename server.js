const express=require("express");

const hbs=require("hbs");

const fs=require("fs");

var app= express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));
app.use((req,res,next)=>{

var now = new Date().toString();
var data= `${now}: ${req.method} ${req.url}`;
  console.log(data);
  fs.appendFile("server.log",data + '\n',(err)=>{
    if(err){
      console.log("Unable to apend to server.log")
    }
  })
  next();
})

app.use((req,res,next)=>{
  res.render("maintenance.hbs");
  // next();
})

hbs.registerHelper("stateCurrentYear",()=>{
  return new Date().getFullYear();

});

hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase();
})




app.get("/",(req,res)=>{
  // res.send("<h1>Hello World!</h1>");
  // res.send({
  //   Name:"Henry Ofodile",
  //   like:["Stew","Fish","Meat"]
  // })
  res.render("home.hbs",{
    pageTitle:"Home Page",
    welcomePage:"Welcome to my Website",
    currentYear:new Date().getFullYear()
  });
});

app.get("/about",(req,res)=>{

res.render("about.hbs",{
  pageTitle:"About Page",
  currentYear:new Date().getFullYear()
});
});

app.get("/error",(req,res)=>{
res.send({
  Error_Message:"Unable to handle request"
});
});

app.listen(3000,()=>{
console.log("Server is up on port 3000");
});
