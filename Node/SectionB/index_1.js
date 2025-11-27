const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname,"/public");

app.get("/",(req,res)=>{
    res.send("<h2>Welcome to express JS</h2>");

})

app.get("/about",(req,res)=>{
    res.send("{message:This is about my page}");
})

app.get("/htmlFile",(req,res)=>{
    res.sendFile(`${public}/mypage.html`);
})
app.listen(3000,(error)=>{
    if(error){
        console.log(error)
    }
    console.log("Express server runniong on port http://localhost:3000");

})