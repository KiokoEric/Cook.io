const mongoose = require("mongoose")
const RecipeSchema = new mongoose.Schema ({
    Name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true 
    },
    Ingredients: {
        type: Array,
        required: true
    },
    Instructions: {
        type: Array,
        required: true
    },
    Image: {
        type: String
    }, 
    Date: {
        type: Date,
        default: Date.now,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

module.exports = mongoose.model("Recipe", RecipeSchema)