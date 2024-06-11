
const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema({
    name:{type: String, required:true},
    description: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Categorie = mongoose.model("Categorie", CategorieSchema);

module.exports = Categorie;