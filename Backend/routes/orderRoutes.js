const express = require('express');
const router = express.Router();
const multer = require('multer')
const storage = multer.memoryStorage();
const orderCtrl = require('../controllers/orderControllers')


router.post("/carddetails", orderCtrl.carddetails)
router.post("/cardaddress", orderCtrl.cardaddress)
router.get("/getorder/:email", orderCtrl.getorders)
router.get("/pdf/:id", orderCtrl.invoicepdf)



module.exports = router