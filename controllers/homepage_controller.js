const category_model = require("../models/category_model");
const product_model = require("../models/products_model");
const subcategory_model = require("../models/subcategory_model");
const subtwocategory_model = require("../models/subtwocategory_model");

const homePageData = async (req, res) => {
    try {

        const category = await category_model.find();

        for (let i = 0; i < category.length; i++) {
            const obj1 = category[i].toObject();
            const subcategory = await subcategory_model.find({ category_id: obj1._id });

            for (let i = 0; i < subcategory.length; i++) {
                const obj2 = subcategory[i].toObject();
                const subtwocategory = await subtwocategory_model.find({ subcategory_id: obj2._id });

                for (let i = 0; i < subtwocategory.length; i++) {
                    const obj3 = subtwocategory[i].toObject();
                    const product = await product_model.find({ subtwocategory_id: obj3._id });
                    obj3.products = product;
                    subtwocategory[i] = obj3;
                }

                obj2.subtwocategory = subtwocategory;
                subcategory[i] = obj2;
            }


            obj1.subcategory = subcategory;
            category[i] = obj1;
        }

        res.json({
            data: {
                category: category,
                banner: [],
                testimonials: [],
            }
        })

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

module.exports = homePageData;