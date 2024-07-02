const { brandValidator } = require("../Utilities/Validator")
const Brand = require("../models/Brand")

const getAllBrand= async (req,res) =>{
    try {
        const brands = await Brand.find()
        res.status(200).json(brands)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

const getBrand = async (req,res) =>{
try {
    const brand = await Brand.findById(req.params.id)
 if (brand) {
    res.status(200).json(brand)
 }else {
    res.status(404).json({error: "Brand not found"})
 }
} catch (error) {
    res.status(500).json({error: error.message})
}
}    

const createBrand = async (req, res)=>{
    try {
        const validationResult = brandValidator.validate(req.body, {abortEarly: false})
        if( validationResult.error) {
            res.status(400).json(validationResult)
        }else {
            const brand = new Brand({
                name: req.body.name,
                description: req.body.description
            })
            await brand.save()
            res.status(200).json({message : "Brand successfuly created",
               brand: savedBrand
            })
        }
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

const updateBrand = async (req, res) =>{
    try {
        const brandToUpdate= req.params.id
        const validationResult = brandValidator.validate(req.body, {abortEarly: false})
        if( validationResult.error) {
            res.status(400).json(validationResult)
        }else {
            const brand = await Brand.findOneAndUpdate({_id: brandToUpdate}, {$set:req.body},{new: true})
            if (!brand){
                res.status(404).json({error: "Brand not found"})

            } else {
                res.status(200).json({message: "Brand successfally updated", brand})
            }
        }
        
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

const deleteBrand = async (req,res) =>{
    try {
        const brandToDelet= req.params.id
        const brand = await Brand.findOneAndDelete({_id: brandToDelet})
        if (!brand){
            res.status(404).json({error : "Not found"})
        } else {
            res.status(200).json({message : "Brand deleted"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

module.exports= {getAllBrand, getBrand, createBrand, updateBrand, deleteBrand}