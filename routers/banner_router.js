const express = require("express");
const router = express.Router();

const multer = require("multer");

const { createBanner, updateBanner, deleteBanner, getBanner, getBannerById } = require("../controllers/banner_controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })



router.post("/create_banner", upload.single("image"), createBanner);
router.post("/update_banner", upload.single("image"), updateBanner);
router.post("/delete_banner", deleteBanner);
router.get("/get_all_banner", getBanner);
router.post("/get_banner_by_id", getBannerById);

module.exports = router;