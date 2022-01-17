const router = require('express').Router()
const productModel = require('../models/productSchema')
const productCtrl = require('../controllers/productControllers')
const auth = require('../middleware/auth')



router.route('/products').get(productCtrl.getProducts)




module.exports = router