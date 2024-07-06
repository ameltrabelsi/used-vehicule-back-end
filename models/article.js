const mongoose = require ("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    photo: String,
    price: {type: Number, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
   
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'

    },

})
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;