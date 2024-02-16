const express = require('express');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const RecipeRoute = express.Router();
const Recipe = require("../Models/Recipes");
const cookieParser = require("cookie-parser");

RecipeRoute.use(cookieParser())
dotenv.config();

const myPassword = process.env.Password

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, myPassword , (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        next();
        });
    } else {
        return res.status(401).send("Authorisation token is missing!");
    }
}

RecipeRoute.post("/AddRecipe", verifyToken ,async (req, res) => {
    const Recipes = new Recipe(req.body)

    try {
        const SavedRecipes = await Recipes.save() 
        res.send(SavedRecipes)
    } catch (error) {
        console.error(error)
    }
})

RecipeRoute.get("/AllRecipes", async (req, res) => { 
    try{
        const AllRecipes = await Recipe.find() 
        res.json(AllRecipes)
    }
    catch(err) { 
        res.send(err)  
    }
})

RecipeRoute.get('/:userId/Recipes', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Recipes = await Recipe.find({ userOwner: userId });
        res.json(Recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Recipes.' });
    }
});

// UPDATE

RecipeRoute.put("/:id", async (req, res) => {
    try{
        const Recipes= await Recipe.findByIdAndUpdate(req.params.id, req.body)
        res.json(Recipes)
    }
    catch(err) {
        res.send(err) 
    }
})

// DELETE

RecipeRoute.delete("/:id", async (req, res) => {
    try{
        const Recipes = await Recipe.findByIdAndDelete(req.params.id) 
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

RecipeRoute.get('/:id', async (req, res) => {
    try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        return res.status(404).json({ message: 'Recipe is not found' });
    }
    res.json(recipe);
    } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = RecipeRoute