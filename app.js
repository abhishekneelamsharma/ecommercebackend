require("dotenv").config();
require("./config/connection");
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors")

const category_router = require("./routers/category_router")
const subcategory_router = require("./routers/subcategory_router")
const subtwocategory_router = require("./routers/subtwocategory_router")
const homepage_router = require("./routers/homepage_router")
const product_router = require("./routers/product_router")
const banner_router = require("./routers/banner_router")
const testimonial_router = require("./routers/testimonial_router")


// middleaware 
app.use(cors())
app.use(express.json());

//My router
app.use("/api/category",category_router)
app.use("/api/subcategory",subcategory_router)
app.use("/api/subtwocategory",subtwocategory_router)
app.use("/api/products",product_router);
app.use("/api/banner",banner_router);
app.use("/api/testimonials",testimonial_router);

app.use("/api/homepagedata",homepage_router)


app.listen(PORT, () => {
    console.log(`server is running on the server ${PORT}`);
})