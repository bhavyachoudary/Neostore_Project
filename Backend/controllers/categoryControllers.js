const categoryModel = require('../models/categorySchema')
const productModel = require('../models/productSchema')
const colorModel = require('../models/colorSchema')


const categoryCtrl = {
    getCategoryProducts: (req, res) => {
        let id = req.params.id
        productModel.find({ 'category_id': id })
            .populate(["category_id", "color_id"]).exec((err, data)=> {
                if(err){
                    res.json({'err':"can't get category products"}).status(400)
                }
                else{
                    res.json({ products: data })
                }
            })
        
    },

    getColorProducts: (req, res) => {
        let id = req.params.id
        productModel.find({ 'color_id': id })
            .populate(["category_id", "color_id"]).exec((err, data)=> {
                if(err){
                    res.json({'err':"can't get color products"}).status(400)
                }
                else{
                    res.json({ products: data })
                }
        })
    },
  
    getAllCategories: (req, res) => {
        categoryModel.find({},(err,data)=>{
            if(err){
                res.json({'err':"can't get all categories"}).status(400)
            }
            else{
                res.json({ category: data })
            }
        })
       
    },
    getAllColors: (req, res) => {
        colorModel.find({},(err,data)=>{
            if(err){
                res.json({'err':"can't get all colors"}).status(400)
            }
            else{
                res.json({ colors: data })
            } 
        })
    }
    
}


module.exports = categoryCtrl





