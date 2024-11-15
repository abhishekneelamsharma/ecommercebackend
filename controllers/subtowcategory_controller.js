const category_model = require("../models/category_model");
const subcategory_model = require("../models/subcategory_model");
const subtwocategory_model = require("../models/subtwocategory_model");


const createSubtwocategory = async (req, res) => {
    try {

        const { category_id, subcategory_id, subtwocategory_name, subtwocategory_slug } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename;
        }
        if (!category_id || !subcategory_id || !subtwocategory_name || !subtwocategory_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        const data = new subtwocategory_model({ category_id, subcategory_id, subtwocategory_name, subtwocategory_slug, image });
        await data.save();
        res.json({ message: "created successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const deleteSubtwocategory = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await subtwocategory_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "unable to delete", status: 0 });
        }
        return res.json({ message: "Deleted successfully", status: 1 });

    } catch (err) {
        console.log(err);
    }
}


const updateSubtwocategory = async (req, res) => {
    try {
        const { category_id, subcategory_id, subtwocategory_name, subtwocategory_slug, id } = req.body;
        console.log(req.body);
        if (!subtwocategory_name || !subtwocategory_slug) {
            return res.json({ message: "Please fill all the fields", status: 0 })
        }
        if (req.file) {
            const image = req.file.filename;
            await subtwocategory_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_id, subtwocategory_name, subtwocategory_slug, image });
        } else {
            console.log(subtwocategory_name, subtwocategory_slug)
            await subtwocategory_model.findByIdAndUpdate({ _id: id }, { category_id, subcategory_id, subtwocategory_name, subtwocategory_slug });
        }

        res.json({ message: "sub category updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const getAllSubcategories = async (req, res) => {
    try {

        let data = await subtwocategory_model.find({})

        if (!data) {
            return res.json({ message: "Unable to get subtwocategory data", status: 0 });
        }

        const category_data = await category_model.find({});
        const subcategory_data = await subcategory_model.find({});

        data = data.map((subtwo) => {
            const category = category_data.find((category) => category._id == subtwo.category_id);
            const subcategory = subcategory_data.find((subcate) => subcate._id == subtwo.subcategory_id);

            if(category && subcategory){
                return {...subtwo.toObject(),category_name:category.category_name,
                subcategory_name:subcategory.subcategory_name}
            }
            return subtwo;
        })


        res.json({ message: "Get subtwocategory data successfully", status: 1, data: data });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching subcategories", status: 0 });
    }
};


const getSubtwocategoryById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await subtwocategory_model.findOne({ _id: id });
        if (!data) {
            res.json({ message: "unable to get subtwocategory data", status: 0 });
        }
        res.json({ message: "Get subtwocategory data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createSubtwocategory, deleteSubtwocategory, updateSubtwocategory, getSubtwocategoryById, getAllSubcategories
}