const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT" ,"DELETE"],  
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// MongoDB Connection    

const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl)
.then(() => console.log("Connected to the database!"))

// Import Routes

const UserRoute = require("./Routes/UserRoute");
const RecipeRoute = require("./Routes/RecipeRoute"); 
const FavouriteRoute = require("./Routes/FavouriteRoute"); 


app.use("/Users", UserRoute);
app.use("/Recipe", RecipeRoute);
app.use("/Favourites", FavouriteRoute);

app.listen(4000)