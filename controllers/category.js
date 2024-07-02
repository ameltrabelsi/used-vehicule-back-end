const Category = require('../models/Category');
const { categoryValidator } = require('../Utilities/Validator')

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCategory = async (req, res) => {
    console.log(req.params.id)
    try {
        const category = await Category.findById(req.params.id)
        console.log(category);
        if (category) {
            res.status(200).json(category)
        } else {
            res.status(404).json({ error: "category not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createCategory = async (req, res) => {
    try {

        const validationResult = categoryValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        } else {
            const category = new Category({
                name: req.body.name,
                description: req.body.description
            })
             await category.save()
            res.status(201).json({
                message: "Category created successfully",
                category: savedCategory
            })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

const updateCategory = async (req, res) => {
    try {
        const categUpdate = req.params.id
        const validationResult = categoryValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        } else {
            const category = await Category.findOneAndUpdate({ _id: categUpdate }, { $set: req.body }, { new: true })
            if (!category) {
                res.status(404).json({ error: "category not found" })
            } else {
                res.status(200).json({
                    message: "Category updated successfully",
                    category
                })
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const categDeleted = req.params.id
        const result = await Category.deleteOne({ _id: categDeleted })
        if (result.deletedCount === 1) {
            res.json({
                message: "Category deleted successfully",
                category: {
                    _id: categDeleted
                }
            })
        } else {
            res.status(404).json({ error: "Category not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



module.exports = { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory }