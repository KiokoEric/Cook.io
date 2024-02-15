const mongoose = require("mongoose")
const FavouritesSchema = new mongoose.Schema ({
    ID: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Favourite", FavouritesSchema)