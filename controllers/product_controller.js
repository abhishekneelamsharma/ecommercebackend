const category_model = require("../models/category_model");
const subcategory_model = require("../models/subcategory_model");
const subtwocategory_model = require("../models/subtwocategory_model");
const product_model = require("../models/products_model");


const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content } = req.body;

        console.log(category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content)
        let image;
        if (req.file) {
            image = req.file.filename;
        }
        if (!category_id || !subcategory_id || !subtwocategory_id || !product_name || !product_content || !product_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        const data = new product_model({ category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content, image });
        await data.save();
        res.json({ message: "sub category created successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await product_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "unable to delete", status: 0 });
        }
        return res.json({ message: "Deleted successfully", status: 1 });

    } catch (err) {
        console.log(err);
    }
}


const updateProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content, id } = req.body;

        if (!product_name || !product_slug || !product_content) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        if (req.file) {
            const image = req.file.filename;
            await product_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content, image });
        } else {

            await product_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_id, subtwocategory_id, product_name, product_slug, product_content });
        }

        res.json({ message: "sub category updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const getAllProducts = async (req, res) => {
    try {

        let data = await product_model.find({})

        if (!data) {
            return res.json({ message: "Unable to get product data", status: 0 });
        }

    

        for (let i = 0; i < data.length; i++) {
            const obj = data[i].toObject();
            const category = await category_model.findOne({_id:obj.category_id});
            const subcategory = await subcategory_model.findOne({_id:obj.subcategory_id});
            const subtwocategory = await subtwocategory_model.findOne({_id:obj.subtwocategory_id});

            console.log(category);

            obj.category_name = category.category_name;
            obj.subcategory_name = subcategory.subcategory_name;
            obj.subtwocategory_name = subtwocategory.subtwocategory_name;

            data[i] = obj;
        }

        console.log(data);

        res.json({ message: "Get product data successfully", status: 1, data: data });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching subcategories", status: 0 });
    }
};


const getproductById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await product_model.findOne({ _id: id });
        if (!data) {
            res.json({ message: "unable to get product data", status: 0 });
        }
        res.json({ message: "Get product data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createProduct, deleteProduct, updateProduct, getproductById, getAllProducts
}