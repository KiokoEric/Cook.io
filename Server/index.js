const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Middleware

app.use(cors({
    origin: ["https://cook-io-mu.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

    // MongoDB Connection    

const dbUrl = "mongodb+srv://KiokoEric:Victory2023@cluster0.lnhdon1.mongodb.net/The_Cook?retryWrites=true&w=majority"

mongoose.connect(dbUrl,  {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("Connected to the database!"))


// import Routes

const UserRoute = require("./Routes/UserRoute");
const RecipeRoute = require("./Routes/RecipeRoute"); 
const FavouriteRoute = require("./Routes/FavouriteRoute"); 

app.use("/Users", UserRoute);
app.use("/Recipe", RecipeRoute);
app.use("/Favourites", FavouriteRoute);

app.listen(4000, () => {
    console.log("Welcome to Cook.io")
})    