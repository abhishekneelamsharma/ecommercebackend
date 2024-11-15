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


const { createSubtwocategory, updateSubtwocategory, deleteSubtwocategory, getSubtwocategoryById, getAllSubcategories, } = require("../controllers/subtowcategory_controller");

router.post("/create_subtwocategory", upload.single('image'),createSubtwocategory);
router.post("/update_subtwocategory", upload.single('image'),updateSubtwocategory);
router.post("/delete_subtwocategory", deleteSubtwocategory);
router.post("/get_subtwocategory_by_id", getSubtwocategoryById);
router.get("/get_all_subtwocategory", getAllSubcategories);


module.exports = router;