const express = require("express");
const router = express.Router();

const multer = require("multer");

const { createTestimonial, updateTestimonial, deleteTestimonial, getTestimonial, getTestimonialById } = require("../controllers/testimonial_controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })


router.post("/create_testimonial",upload.single("image"),createTestimonial)
router.post("/update_testimonial",upload.single("image"),updateTestimonial)
router.post("/delete_testimonial",deleteTestimonial);
router.get("/get_all_testimonial",getTestimonial);
router.post("/get_testimonial_by_id",getTestimonialById);


module.exports = router;