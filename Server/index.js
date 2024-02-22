const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware

// app.use(cors({
//     Origin: ["https://cook-io-mu.vercel.app"],
//     methods: ["POST", "GET", "PUT", "DELETE", "Access-Control-Allow-Methods"],
//     credentials: true
// }))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin: *'); // Allow requests from any origin
//     res.header('Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
//     res.header('Access-Control-Allow-Headers : Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Allowed headers
//     next();
// });
app.use(cors())
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
