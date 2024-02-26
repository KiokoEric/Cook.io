const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware

app.options('*', cors())

// app.use(cors({
//     Origin: ["https://cook-io-server.vercel.app"],
//     methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
//     credentials: true
// }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://cook-io-server.vercel.app'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
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

app.options("/Users", cors())
app.use("/Users", UserRoute);
app.options("/Recipe", cors())
app.use("/Recipe", RecipeRoute);
app.options("/Favourites", cors())
app.use("/Favourites", FavouriteRoute);
