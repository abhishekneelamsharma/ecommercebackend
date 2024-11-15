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


const { createCategory, updateCategory, deleteCategory, getCategoryById, getAllCategories, get_catgory_with_subcategory } = require("../controllers/category_controller");

router.post("/create_category", upload.single('image'),createCategory);
router.post("/update_category", upload.single('image'),updateCategory);
router.post("/delete_category", deleteCategory);
router.post("/get_category_by_id", getCategoryById);
router.get("/get_all_category", getAllCategories);
router.get("/get_catgory_with_subcategory", get_catgory_with_subcategory);


module.exports = router;