const productModel = require('../models/productSchema')
const colorModel = require('../models/colorSchema')

const productCtrl = {
    getProducts: (req, res) =>{
        productModel.find().populate(["category_id","color_id"])
        .then(product=>{
            //console.log(product);
            res.json({ products: product})
          
        })
    }    
}


module.exports = productCtrl