const category_model = require("../models/category_model");
const subcategory_model = require("../models/subcategory_model");
const subtwocategory_model = require("../models/subtwocategory_model");


const createCategory = async (req, res) => {
    try {

        const { category_name, category_slug } = req.body;
        const image = req.file ? req.file.filename : null

        if (!category_name || !category_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new category_model({ category_name, category_slug, image });
        await data.save();
        res.json({ message: "Category Created successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


const get_catgory_with_subcategory = async (req, res) => {
    try {
         data = await category_model.find({});
  
        for (let i = 0; i < data.length; i++) {
            const obj = data[i].toObject();

            const subcategory = await subcategory_model.find({ category_id: data[i]._id });
            obj.subcategory = subcategory;

            for (let i = 0; i < subcategory.length; i++) {
                const newObj = subcategory[i].toObject();
                const subtwocategory = await subtwocategory_model.find({ subcategory_id: subcategory[i]._id });
                newObj.subtwocategory = subtwocategory;
                subcategory[i] = newObj;
            }

            data[i] = obj
        }

        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await category_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete category", status: 0 })
        }
        const newData = await category_model.find({});
        res.json({ message: "Category deleted successfully", status: 1, data: newData });

    } catch (err) {
        console.log(err);
    }
}

const updateCategory = async (req, res) => {
    try {
        const { category_name, category_slug, id } = req.body;

        console.log(req.body);
        if (!category_name || !category_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        if (req.file) {
            const image = req.file.filename;
            await category_model.findByIdAndUpdate({ _id: id }, { category_name, category_slug, image });
        } else {
            await category_model.findByIdAndUpdate({ _id: id }, { category_name, category_slug });
        }


        res.json({ message: "Category Updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


const getAllCategories = async (req, res) => {
    try {
        const data = await category_model.find({});
        if (!data) {
            res.json({ message: "unable to get category data", status: 0 });
        }
        res.json({ message: "Get category data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await category_model.findOne({ _id: id });

        if (!data) {
            res.json({ message: "unable to get category data", status: 0 });
        }
        res.json({ message: "Get category data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = { createCategory, deleteCategory, updateCategory, getAllCategories, getCategoryById, get_catgory_with_subcategory }