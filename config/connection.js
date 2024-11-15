const mongoose = require("mongoose");
const URL = process.env.URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URL)
        console.log("Database connected successfully...")
    } catch (err) {
        console.log("Unable to connect database:" + err);
    }
}
connectDB();
