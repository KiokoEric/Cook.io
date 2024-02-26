const express = require('express');
const UserRouter = express.Router();
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const User = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import Axios from "axios";
const cors = require("cors");

const myPassword = process.env.Password

UserRouter.options('*', cors())

UserRouter.use(cookieParser())
dotenv.config();

UserRouter.options('/Registration', cors()) 
UserRouter.post("/Registration", cors(),  async (req, res) => {

    // Checking if the user is already in the database

    const EmailExist = await User.findOne({Email: req.body.Email})
    if(EmailExist) return res.status(400).send("Email already exists!")

    // Hash Password

    const salt = bcrypt.genSaltSync(10);
    var Hashedpassword = await bcrypt.hash(req.body.Password, salt); 

    const NewUser = new User ({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: Hashedpassword
    })
    try {
        const SavedUser = await NewUser.save() 
        res.send(SavedUser)
    } catch (error) {
        console.error(error)
    }
})

// UserRouter.options("/Login", cors()) 
// UserRouter.post("/Login", cors(), async (req, res) => {

//     // Checking if the email is in the database

//     const NewUser = await User.findOne({Email: req.body.Email})
//     if(!NewUser) return res.status(400).send("Email is not valid!"); 

//     // correctPassword

//     const validPassword = await bcrypt.compare(req.body.Password, NewUser.Password)
//     if(!validPassword) return res.status(400).send("Password is not valid!");

//     // Create and assign a token

//     if (NewUser) {
//         const Token = jwt.sign({_id: NewUser._id}, myPassword);
//         res.json({Token, UserID: NewUser._id});
//     }  
// })

UserRouter.post('/Login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        // Make a POST request to authenticate the user
        const LoginData = await Axios.post('http://authentication-service.com/login', {
        Email,Password})
        .then(response  => {
            res.header('Access-Control-Allow-Origin', 'https://cook-io-server.vercel.app'); 
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            // Assuming the authentication service responds with a token upon successful login
            const AuthorisationToken = LoginData .data.token;

            // You can then send back the token to the client or use it for further operations
            res.json({ Token: AuthorisationToken});
        })
    } catch (error) {
        // Handle any errors, such as incorrect credentials or network issues
        console.error('Login error:', error.LoginData  ? error.LoginData .data : error.message);
        res.status(error.LoginData  ? error.LoginData .status : 500).json({ error: 'Login failed' });
    }
});

UserRouter.options('/:id', cors()) 
UserRouter.get('/:id', cors(),  async (req, res) => { 
    try {
    const UserDetails = await User.findById(req.params.id);
    if (!UserDetails) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json(UserDetails);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

UserRouter.options('/:userId/Name', cors()) 
UserRouter.get('/:userId/Name', cors(), async (req, res) => { 

    try {
    const UserID= await User.findById(req.params.userId);
    if (!UserID) {
        return res.status(404).json({ message: 'User was not found' });
    }
    res.json({ Name: UserID.Name });
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

// UPDATE

UserRouter.options('/:id', cors()) 
UserRouter.put("/:id", cors(),  async (req, res) => {
    const userId = req.params.id;
    const updatedProfile = req.body;

    try {

        if (updatedProfile.Password) {
            // Hash the password before saving it to the database
            const salt = await bcrypt.genSalt(10); 
            updatedProfile.Password = await bcrypt.hash(updatedProfile.Password, salt);
        }

        const Profile = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });
        res.json({ success: true, message: 'Profile updated successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
}) 

// DELETE

UserRouter.options("/Delete/:id", cors()) 
UserRouter.delete("/Delete/:id", cors(),  async (req, res) => {  
    try {
        const userId = req.params.id;

        // Delete the user from the database
        await User.findByIdAndDelete(userId);
        res.json({ message: 'User profile deleted successfully' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

UserRouter.options("/Logout", cors()) 
UserRouter.get("/Logout", cors(),  (req, res) => {
    res.clearCookie("Token"); 
})

module.exports = UserRouter;     