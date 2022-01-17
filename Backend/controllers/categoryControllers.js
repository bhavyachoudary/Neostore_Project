const categoryModel = require('../models/categorySchema')
const productModel = require('../models/productSchema')
const colorModel = require('../models/colorSchema')

const getCategoryProducts = (id)=>{
    return productModel.find({'category_id':id})
.populate(["category_id","color_id"])
.exec()

}

const getColorProducts = (id)=>{
    // console.log(id)
    return productModel.find({'color_id':id})
.populate(["category_id","color_id"])

}

const getAllCategories=()=>{
    return categoryModel.find({}).exec();
}

const getAllColors=()=>{
    return colorModel.find({}).exec();
}
module.exports = {getCategoryProducts,getColorProducts,getAllCategories,getAllColors};



