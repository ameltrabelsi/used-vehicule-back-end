
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name:{type: String, required:true, unique: true},
    description: {type: String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;