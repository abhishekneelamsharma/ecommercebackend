const banner_model = require("../models/banner_models");


const createBanner = async (req, res) => {
    try {

        const { heading, subheading, title } = req.body;
        const image = req.file ? req.file.filename : null;
        if (!heading || !subheading || !title || !image) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = new banner_model({ heading, subheading, title, image });
        await data.save();
        res.json({ message: "created successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const updateBanner = async (req, res) => {
    try {

        const { heading, subheading, title, id } = req.body;
        if (!heading || !subheading || !title) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        if (req.file) {
            const image = req.file.filename;
            await banner_model.findByIdAndUpdate({ _id: id }, { heading, subheading, title, image })
        }else{
            await banner_model.findByIdAndUpdate({ _id: id }, { heading, subheading, title});
        }

        res.json({ message: "updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await banner_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "unable to delete", status: 0 })
        }

        res.json({ message: "deleted successfully", status: 1 });

    } catch (err) {
        console.log()
    }
}

const getBanner = async (req, res) => {
    try {
        const data = await banner_model.find({});
        if (!data) {
            return res.json({ message: "unable to get data", status: 0 });
        }
        res.json({ message: "get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

const getBannerById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await banner_model.findOne({ _id: id });
        res.json({ message: "get successfully", data: data, status: 1 });
    } catch (err) {
        console.log(err);
    }
}



module.exports = { createBanner, updateBanner, deleteBanner, getBanner, getBannerById }