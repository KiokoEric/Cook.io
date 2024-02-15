const express = require('express');
const FavouriteRoute = express.Router();
const Favourite = require("../Models/Favourites");
const cookieParser = require("cookie-parser");

FavouriteRoute.use(cookieParser())

FavouriteRoute.post("/AddFavourite", async (req, res) => {
    const Recipes = new Favourite(req.body)

    try {
        const SavedRecipe = await Recipes.save() 
        res.send(SavedRecipe)
    } catch (error) {
        console.error(error)
    }
})

FavouriteRoute.post("/Favourite/:id", async (req, res) => {
    const Recipes = new Favourite(req.body)

    try {
        const SavedRecipe = await Recipes.save() 
        res.send(SavedRecipe)
    } catch (error) {
        console.error(error)
    }
})

FavouriteRoute.get('/:userId/Favourites', async (req, res) => {
    const userId = req.params.userId;
    try {
        const Favourites = await Favourite.find({ userOwner: userId });
        res.json(Favourites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favourites.' });
    }
});

FavouriteRoute.delete("/:id", async (req, res) => {
    try{
        const Favourites = await Favourite.findByIdAndDelete(req.params.id)
        res.json({Message: "Deleted Successfully!"})
    }
    catch(err) {
        res.send(err)
    }
})

module.exports = FavouriteRoute