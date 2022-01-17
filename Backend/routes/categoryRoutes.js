const express=require('express');
const router = express.Router();
const  productmodel = require('../models/productSchema')

const {getCategoryProducts,getColorProducts,getAllCategories,getAllColors}=require('../controllers/categoryControllers')

router.get("/singleproduct/:id", (req, res) => {
    let id = req.params.id
    productmodel.findOne({ _id: id })
        .populate("color_id")
        .then(product => {
            console.log(product);
            res.json({ product: product, image: product.subimages })
         
        })

})

router.put("/rate/:id",async(req,res)=>{
    let id = req.params.id;
    let product_rating=req.body.newrating
    
    console.log(id)

    console.log(product_rating)
    console.log(req.body)
   
    productmodel.updateOne({_id:id},{$set:{product_rating:product_rating}},(err)=>{
        if(err) {
            res.json({err:err})
        }
        else{
            res.json({msg:"Rating Updated Succesfully"});
        }
      
    })
})

router.get('/catproducts/:id',(req,res)=>{
    let id=req.params.id
    // console.log(id)
    const products=getCategoryProducts(id)
    
    products.then(response=>{
        res.json({products:response})
    })
})
router.get('/colproducts/:id',(req,res)=>{
    let id=req.params.id

    const products=getColorProducts(id)
    products.then(response=>{
        res.json({products:response})
    })

})

router.get('/category',(req,res)=>{
    let category=getAllCategories()
   
    category.then(response=>{
        res.json({category:response})
    })

})
router.get('/color',(req,res)=>{
    let colors=getAllColors()
    colors.then(response=>{
        res.json({colors:response})
        // console.log(response)
    })

})


module.exports = router