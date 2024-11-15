const testimonial_model = require("../models/testimonial_model");


const createTestimonial = async (req, res) => {
    try {

        const { name, designation, content } = req.body;
        const image = req.file ? req.file.filename : null;
        if (!name || !designation || !content || !image) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = new testimonial_model({  name, designation, content, image });
        await data.save();
        res.json({ message: "created successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const updateTestimonial = async (req, res) => {
    try {

        const {  name, designation, content, id } = req.body;
        if ( !name || !designation || !content) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        if (req.file) {
            const image = req.file.filename;
            await testimonial_model.findByIdAndUpdate({ _id: id }, {  name, designation, content, image })
        }else{
            await testimonial_model.findByIdAndUpdate({ _id: id }, {  name, designation, content});
        }

        res.json({ message: "updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
    }
}

const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonial_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "unable to delete", status: 0 })
        }

        res.json({ message: "deleted successfully", status: 1 });

    } catch (err) {
        console.log()
    }
}

const getTestimonial = async (req, res) => {
    try {
        const data = await testimonial_model.find({});
        if (!data) {
            return res.json({ message: "unable to get data", status: 0 });
        }
        res.json({ message: "get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

const getTestimonialById = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonial_model.findOne({ _id: id });
        res.json({ message: "get successfully", data: data, status: 1 });
    } catch (err) {
        console.log(err);
    }
}



module.exports = { createTestimonial, updateTestimonial, deleteTestimonial, getTestimonial, getTestimonialById }