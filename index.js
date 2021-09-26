const express = require("express")
const app = express();
app.use(express.json())
const dotenv=require("dotenv")
dotenv.config();

const productRoute = require("./routes/product")
const userRoute = require("./routes/user")

const db = require("./config/db")

db()

const fn =()=>console.log("listening")



app.use('/api/products', productRoute)
app.use("/api/users" , userRoute)

app.listen(process.env.PORT || 5000 , fn)



