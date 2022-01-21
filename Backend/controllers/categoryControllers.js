const categoryModel = require('../models/categorySchema')
const productModel = require('../models/productSchema')
const colorModel = require('../models/colorSchema')

const categoryCtrl = {
    getCategoryProducts: (req, res) => {
        let id = req.params.id
        // console.log(id)
        const products = productModel.find({ 'category_id': id })
            .populate(["category_id", "color_id"])

        products.then(response => {
            res.json({ products: response })
        })
    },

    getColorProducts: (req, res) => {
        let id = req.params.id

        const products = productModel.find({ 'color_id': id })
            .populate(["category_id", "color_id"])
        products.then(response => {
            res.json({ products: response })
        })

    },
    getAllCategories: (req, res) => {

        let category = categoryModel.find({}).exec();
        category.then(response => {
            res.json({ category: response })
        })

    },
    getAllColors: (req, res) => {
        let colors = colorModel.find({}).exec();
        colors.then(response => {
            res.json({ colors: response })
            // console.log(response)
        })
    }

}


module.exports = categoryCtrl





