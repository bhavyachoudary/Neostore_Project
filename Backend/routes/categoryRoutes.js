const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryControllers')

router.get('/catproducts/:id', categoryCtrl.getCategoryProducts)
router.get('/colproducts/:id', categoryCtrl.getColorProducts)
router.get('/category', categoryCtrl.getAllCategories)
router.get('/color', categoryCtrl.getAllColors)


module.exports = router