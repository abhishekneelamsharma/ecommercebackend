const mongoose = require("mongoose");

const subtwocategory_schema = new mongoose.Schema({
    category_id: {
        type: String,
        default: null
    },
    subcategory_id: {
        type: String,
        default: null
    },
    subtwocategory_name: {
        type: String,
        default: null
    },
    subtwocategory_slug: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
})

const subtwocategory_model = new mongoose.model("subtwocategory_model", subtwocategory_schema);
module.exports = subtwocategory_model;
