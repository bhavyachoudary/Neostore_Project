const express = require('express');
const multer = require('multer')
const orderData = require('../models/orderSchema')


const orderCtrl = {
    carddetails: (req, res) => {
        let field = {
            Orderno: req.body.orderno,
            email: req.body.email,
            items: req.body.items,
            total: req.body.total,
        };
        //console.log(field)
        let ins = new orderData({ ...field });
        ins.save((err) => {
            if (err) {
                console.log(err)
                res.json({ "err": "Not added" }).status(400);
            } else {
                res.status(200).json({ flag: 1, msg: "Details Added" });
            }

        });
    },

    cardaddress: (req, res) => {
        let email = req.body.email;
        orderData.updateOne({ email: email, Orderno: req.body.orderno }, { $set: { "selectaddr": req.body.selectaddr } }, (err) => {
            if (err) res.json({ err: err }).status(400);
            res.status(200).json({ msg: "ORDER PLACED Succesfully" });
        })

    },

    getorders: (req, res) => {
        let email = req.params.email;
        orderData.find({ email: email }, (err, data) => {
            if (err) {
                throw err;
            }
            res.status(200).json({ user: data })
            // console.log(data.items)
        })
    },

    invoicepdf: (req, res) => {
        let id = req.params.id
        //console.log(id)
        orderData.find({ _id: id })
            .then(data => {
                console.log(data);
                res.status(200).json({ pdf: data, item: data.items })
                console.log(data.items)

            })

    }

}


module.exports = orderCtrl