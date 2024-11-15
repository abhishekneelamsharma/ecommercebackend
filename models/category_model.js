const mongoose = require("mongoose");

const category_schema = new mongoose.Schema({
    category_name: {
        type: String,
        default: null
    },
    category_slug: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    }
    // status: {
    //     type: Boolean,
    //     default: null
    // }
})

const category_model = new mongoose.model("category_model",category_schema);
module.exports = category_model;
