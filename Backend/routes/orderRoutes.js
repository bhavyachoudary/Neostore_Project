const express = require('express');
const router = express.Router();
const multer=require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require("nodemailer");
const orderData = require('../models/orderSchema')


router.post("/carddetails", (req, res) => {
    let field = {
        Orderno: req.body.orderno,
        email: req.body.email,
        items: req.body.items,
        total: req.body.total,
    };
    console.log(field)
    let ins = new orderData({ ...field });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.json({"err":"Not added"});
        } else {
            res.json({ flag: 1, msg: "Details Added" });
        }

    });
});

router.post("/cardaddress", (req, res) => {

    let email = req.body.email;

    orderData.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
       
        if (err) res.json({ err: err });
        res.json({ msg: "ORDER PLACED" });
    })


});



//order data
router.get("/getorder/:email", (req, res) => {
    let email = req.params.email;
    orderData.find({ email: email }, (err, data) => {
        if (err) {
            throw err;
        }
        res.json({ user: data })
       // console.log(data.items)
    })
})


//invoice
router.get("/pdf/:id", (req, res) => {
    let id = req.params.id
    console.log(id)
    orderData.find({ _id: id })
        .then(data => {
            console.log(data);
            res.json({ pdf: data,item:data.items})
            console.log(data.items)
         
        })

})


router.post("/sendmail", upload.single("file"), (req, res) => {
    
    console.log(req.file);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "bhavyamullapudi3@gmail.com",
            pass: "Bhavya@03",
        },
    });
    let mailOptions = {
        from: "bhavyamullapudi3@gmail.com",
        to:"bhavyamullapudi3@gmail.com",
        subject: "Invoice Details",
        text: "Invoice Details",
        attachments: [
            {
                filename: "invoice.pdf",
                content: req.file.buffer,
            },
        ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
module.exports = router