const router = require('express').Router()
const productCtrl = require('../controllers/productControllers')

router.route('/products').get(productCtrl.getProducts)
router.route("/singleproduct/:id").get(productCtrl.singleproduct)
router.put("/rate/:id", productCtrl.rating)

module.exports = router