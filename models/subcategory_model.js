const mongoose = require("mongoose");

const subcategory_schema = new mongoose.Schema({
    category_id: {
        type: String,
        default: null
    },
    subcategory_name: {
        type: String,
        default: null
    },
    subcategory_slug: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})

const subcategory_model = new mongoose.model("subcategory_model", subcategory_schema);
module.exports = subcategory_model;
