const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    category_id: {
        type: String,
        default: null
    },
    subcategory_id: {
        type: String,
        default: null
    },
    subtwocategory_id: {
        type: String,
        default: null
    },
    product_name: {
        type: String,
        default: null
    },
    product_content: {
        type: String,
        default: null
    },
    product_slug:{
        type: String,
        default: null
    },
    image:{
        type:String,
        default:null
    }
})

const product_model = new mongoose.model("product_schema",product_schema);
module.exports = product_model;
