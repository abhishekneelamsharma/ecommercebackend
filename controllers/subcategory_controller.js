const category_model = require("../models/category_model");
const subcategory_model = require("../models/subcategory_model");


const createSubcategory = async (req, res) => {
    try {
       
        const { category_id, subcategory_name, subcategory_slug } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename;
        }
        if (!category_id || !subcategory_name || !subcategory_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        const data = new subcategory_model({ category_id, subcategory_name, subcategory_slug, image });
        await data.save();
        res.json({ message: "sub category created successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await subcategory_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "unable to delete", status: 0 });
        }
        return res.json({ message: "Deleted successfully", status: 1 });

    } catch (err) {
        console.log(err);
    }
}


const updateSubcategory = async (req, res) => {
    try {
        const { category_id, subcategory_name, subcategory_slug, id } = req.body;
        
        if (!subcategory_name || !subcategory_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        if (req.file) {
            const image = req.file.filename;
            await subcategory_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_name, subcategory_slug, image });
        }else {
            console.log(subcategory_name,subcategory_slug)
            await subcategory_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_name, subcategory_slug});
        }

        res.json({ message: "sub category updated successfully",status:1 });
    } catch (err) {
        console.log(err);
    }
}

const getAllSubcategories = async (req, res) => {
    try {
        
        let data = await subcategory_model.find({})

        if (!data) {
            return res.json({ message: "Unable to get subcategory data", status: 0 });
        }

        const category_data = await category_model.find({});


        data = data.map((subcategory) => {
            const category = category_data.find((cate) => cate._id == subcategory.category_id)

            if (category) {
                return { ...subcategory.toObject(), category_name: category.category_name }
            }
            return subcategory;
        })

        res.json({ message: "Get subcategory data successfully", status: 1, data: data });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching subcategories", status: 0 });
    }
};


const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await subcategory_model.findOne({ _id: id });
        if (!data) {
            res.json({ message: "unable to get subcategory data", status: 0 });
        }
        res.json({ message: "Get subcategory data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createSubcategory, deleteSubcategory, updateSubcategory, getSubcategoryById, getAllSubcategories
}