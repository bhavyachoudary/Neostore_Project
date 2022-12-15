const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer')
const pofileCtrl = require('../controllers/profileControllers')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'E:/Mypractice/NeoStore/public/images')


    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }

}).single('file');


router.post("/addaddress", pofileCtrl.addaddress)
router.post("/editaddress", pofileCtrl.editaddress)
router.post("/deleteadd/:email", pofileCtrl.deleteaddress)
router.put("/changepass/:id", pofileCtrl.changepassword)
router.put('/updprofile/:id', pofileCtrl.updateprofile)
router.get("/profile/:email", pofileCtrl.getprofile)
router.post("/upload", upload, pofileCtrl.multer)


module.exports = router;