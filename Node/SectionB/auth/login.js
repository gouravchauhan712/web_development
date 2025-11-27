const express = require("express");
const authRouter = express.Router();
const filter = (req,res,next)=>{
    if(!req.query.user){
        console.log("this is not valid");
    }
    else{
        next();
    }
}
authRouter.get("/",(req, res) => {
    res.send("this is login route");
});

authRouter.get("/register",filter, (req, res) => {
    const { userName, pass } = req.query;
    if (userName === 'kiet' && pass === "mca") {
        res.status(200).json({ message: "user registered!" });
    } else {
        res.status(200).json({ error: "user not registered" });
    }
});

module.exports = authRouter;
