const {articleValidator} = require ("../Utilities/Validator");
const cloudinary = require('../Utilities/cloudinary-config')
const Article = require ("../models/article");

const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id).populate('user category', '-password -__v');
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json({ error: "Article not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllAriticle = async (req, res)=>{
    try {
         const articles = await Article.find().populate('user category', '-password -__v');
    res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
   
}

const createArticle = async (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({error : "A photo file is required"})
        }
        const upload = await cloudinary.uploader.upload(req.file.path)
        const validationResult = articleValidator.validate(req.body, {abortEarly: false});
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            const newArticle = new Article({
                title: req.body.title,
                description: req.body.description,
                photo: upload.secure_url,
                price: req.body.price,
                category: req.body.categoryId,
                user: req.user._id
            });
            const savedArticle = await newArticle.save();
            const article = await Article.findById(savedArticle._id).populate('user category', '-password -__v');
           // await savedArticle.populate('user', '-password -__v').execPopulate();
            res.status(201).json({
                message: "Article created successfully",
                newArticle: article
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateArticle = async (req, res) => {
    try {
        const articleToUpdateId = req.params.id;
        const validationResult = articleValidator.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            res.status(400).json(validationResult);
        } else {
            req.body.category = req.body.categoryId;
            const article = await Article.findOneAndUpdate(
                { _id: articleToUpdateId, user: req.user._id },
                { $set: req.body },
                { new: true, populate: { path: 'user category', select: '-password -__v' } }
            );
            if (!article) {
                res.status(404).json({ error: "Article not found" });
            } else {
                res.status(200).json({ message: "Article updated successfully", article });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteArticle = async (req, res)=> {
    try {
        const articleToDelete = req.params.id
        const result = await Article.deleteOne({ _id : articleToDelete, user: req.user._id})
        if (result.deletedCount === 1) {
            res.json({
                message: "Article deleted successfully",
                article: {
                    _id: articleToDelete
                }
            })
        } else {
            res.status(404).json({error: "Article not found"})
    }
 } catch (error) {
    res.status(500).json({ error: error.message }) 
    }
}


module.exports= {getArticle, getAllAriticle, createArticle, updateArticle, deleteArticle}