const mongoose = require ("mongoose")

const BrandSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description: {type: String},

})
const Brand = mongoose.model("Brand",BrandSchema);
module.exports= Brand