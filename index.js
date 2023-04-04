const app = require("./src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000

try {
    const connect = async()=>{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("connected to db...");
    }
    connect()
} catch (error) {
    console.log(error.message);
}

app.listen(PORT,()=>console.log("Server is running"))