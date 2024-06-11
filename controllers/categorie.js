const Categorie = require('../models/Categorie');
const categorieValidator = require('../Utilities/Validator')

const getCategorie = async (req,res) =>{
    try {
const categorie = await Categorie.findById(req.params.id)
if (categorie) {
    res.status(200).json(item)
} else {
    res.status(404).json({ error: "categorie not found" })
}
} catch (error) {
res.status(500).json({ error: error.message })
}
}

const createCategorie = async (req,res) =>{
    try {
      
        const validationResult = categorieValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        }else {
            const categorie = new Categorie ({
                name: req.body.name
             
            })
            await categorie.save()
        }

       
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

const updateCategorie = async (req, res) =>{
    try {
        const categUpdate = req.params.id
        const validationResult = categorieValidator.validate(req.body, { abortEarly: false })
        if (validationResult.error) {
            res.status(400).json(validationResult)
        }else {
            const categorie = await Categorie.findOneAndUpdate({ _id: categUpdate, user: req.user._id })
            if (!categorie) {
                res.status(404).json({error: "categorie not found"})
            } else {
                res.status(200).json({
                    message: "categorie updated successfully",
                    categorie
        })
    }
}
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteCategorie = async (req, res) => {
    try {
        const categDeleted = req.params.id
        const result = await Categorie.deleteOne({ _id: categDeleted, user: req.user._id })
        if (result.deletedCount === 1) {
            res.json({
                message: "categorie deleted successfully",
                categorie: {
                    _id: categDeleted
                }
            })
        } else {
            res.status(404).json({error: "categorie not found"})
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



module.exports= {getCategorie, createCategorie, updateCategorie, deleteCategorie}