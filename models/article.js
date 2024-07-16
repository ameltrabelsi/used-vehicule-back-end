const mongoose = require ("mongoose");

const ArticleSchema = new mongoose.Schema({
    brand: {type: String, required: true},
    style: {type: String, required: true},
    description: {type: String},
    photo: String,
    price: {type: Number, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'

    },

})
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;