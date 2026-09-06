require("dotenv").config();
const app=require('./src/app')
const connectDB = require("./src/db/db")

connectDB()  // mogodb connect

app.listen(3000, ()=>{
    console.log('server is running on port 3000');
})  // server start here