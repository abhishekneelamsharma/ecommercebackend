const express = require("express");
const router = express.Router();

const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

// Multer middleware for handling file uploads
const upload = multer({ storage: storage });


const { createSubcategory, updateSubcategory, deleteSubcategory, getSubcategoryById, getAllSubcategories, } = require("../controllers/subcategory_controller");

router.post("/create_subcategory", upload.single('image'),createSubcategory);
router.post("/update_subcategory", upload.single('image'),updateSubcategory);
router.post("/delete_subcategory", deleteSubcategory);
router.post("/get_subcategory_by_id", getSubcategoryById);
router.get("/get_all_subcategory", getAllSubcategories);


module.exports = router;