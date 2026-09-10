const express=require('express');
const cookieParser=require('cookie-parser')
const userroutes = require("./routes/userroutes");


const app=express(); // here server instance create
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userroutes);

app.get("/", (req, res) => {
    res.send("api is running");
});

module.exports = app;