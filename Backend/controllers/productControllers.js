const productModel = require('../models/productSchema')


const productCtrl = {
    getProducts: (req, res) => {
        productModel.find().populate(["category_id", "color_id"])
            .then(product => {
                //console.log(product);
                res.status(200).json({ products: product })
            })
    },

    singleproduct: (req, res) => {
        let id = req.params.id
        productModel.findOne({ _id: id })
            .populate("color_id")
            .then(product => {
                console.log(product);
                res.status(200).json({ product: product, image: product.subimages })

            })
    },

    rating: (req, res) => {
        let id = req.params.id;
        let product_rating = req.body.newrating
        console.log(id)
        console.log(product_rating)
        console.log(req.body)

        productModel.updateOne({ _id: id }, { $set: { product_rating: product_rating } }, (err) => {
            if (err) {
                res.json({ err: err }).status(400)
            }
            else {
                res.status(200).json({ msg: "Rating Updated Succesfully" });
            }

        })
    }
}


module.exports = productCtrl