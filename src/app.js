require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const userroutes = require("./routes/userroutes");
const postroutes = require("./routes/postroutes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userroutes);
app.use("/api/posts", postroutes);

app.get("/", (req, res) => {
    res.send("api is running");
});

module.exports = app;