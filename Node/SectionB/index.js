const express = require("express");
const app = express();
const auth = require("./auth/login");

app.use("/user", auth);

app.get("/", (req, res) => {
    res.send("welcome to the Advance routing in node js");
});

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Running on http://localhost:3000");
});
