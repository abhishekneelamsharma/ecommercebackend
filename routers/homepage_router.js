const express = require("express");
const router = express.Router();
const homePageData = require("../controllers/homepage_controller");

router.get("/",homePageData)


module.exports = router;