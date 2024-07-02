const { styleValidator } = require("../Utilities/Validator")
const Style = require("../models/Style")

const getAllStyles = async (req, res) => {
    try {
        const styles = await Style.find()
        res.status(200).json(styles)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getStyle = async (req, res) => {
    console.log(req.params.id)
    try {
        const style = await Style.findById(req.params.id)
       
        if (style) {
            res.status(200).json(style)
        } else {
            res.status(404).json({ error: "Style not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createStyle = async (req, res)=>{
    try {
        const validationResult = styleValidator.validate(req.body, {abortEarly: false})
        if( validationResult.error) {
            res.status(400).json(validationResult)
        }else {
            const style = new Style({
                name: req.body.name,
               
            })
            await style.save()
            res.status(200).json({message : "Style successfuly created",
               style: savedStyle
            })
        }
    } catch (error) {
        res.status(500).json({error: error.message})
        
    }
}

const updateStyle = async (req, res) => {
    try {
        const styleToUpdate = req.params.id
        const validationResult = styleValidator.validate( req.body, {agbortEarly: false})
        if (validationResult.error){
            res.status(400).json(validationResult)
        }else {
            const style = await Style.findOneAndUpdate({_id: styleToUpdate}, {$set: req.body},{new: true})
            if (!style) {
                res.status(404).json({error: "Style not found"})

            } else {
                res.status(200).json({message: "Style apdated successfelly", style})
            }
        }

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
 
const deleteStyle = async (req,res)=>{
    try {
        const {id}= req.params;
        const result = await Style.deleteOne({_d: id, user: req.user.id})
        if (result.deletedCount===1){
            res.status(200).json({ message : "Style deleted successfully", 
                style:{_id: id}
            })
        } else {
            res.status(400).json({error: "Can not deleted"})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


module.exports= {getAllStyles, getStyle, createStyle, updateStyle, deleteStyle}