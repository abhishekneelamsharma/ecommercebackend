const express = require("express");
const router = express.Router();

const multer = require('multer');
const { createProduct, deleteProduct, updateProduct, getproductById, getAllProducts } = require("../controllers/product_controller");

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


router.post("/create_product",upload.single('image'),createProduct);
router.post("/delete_product",deleteProduct);
router.post("/update_product",upload.single('image'),updateProduct);
router.post("/get_product_by_id",getproductById);
router.get("/get_all_product",getAllProducts);


module.exports = router;