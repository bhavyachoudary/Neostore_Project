const express = require('express');
const router = express.Router();
const path = require('path')
const otpModel = require("../models/otpSchema")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
const credentials = require('../configFiles/Credentials')
const multer = require('multer')
const Users = require('../models/userSchema')


const profileCtrl = {
    multer: (req, res) => {

        if (req.file) {
            console.log(req.file)
            console.log(req.body)
            let imgpath = req.file.filename;

            Users.updateOne({ email: req.body.email }, { $set: { imagePath: imgpath } }, (err) => {
                if (err) {
                    res.json({ err: "error msg" }).status(400)
                }
                else {
                    res.status(200).json({ msg: "successfully uploaded", image: imgpath })
                }
            });

        }

    },

    getprofile: (req, res) => {
        let email = req.params.email;
        Users.findOne({ email: email }, (err, data) => {
            if (err) res.json({ err: err }).status(400)
            res.json({ user: data, address: data.Address })
        })
    },

    updateprofile: (req, res) => {
        let id = req.params.id;
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let phone = req.body.phone;
        console.log(name)
        // let password = req.body.password;
        Users.updateOne({ _id: id }, { $set: { name: name, lname: lname, email: email, phone: phone } }, (err) => {
            if (err) res.json({ err: err }).status(400);
            res.status(200).json({ msg: "Userprofile has Updated Succesfully" });
        })
    },

    addaddress: (req, res) => {
        console.log("address section")
        console.log(req.body)
        Users.find({ email: req.body.email }, (err, data) => {
            if (err) {
                res.json({ 'err': "Unable to Add Address" }).status(400)
            }
            else {
                let email = req.body.email;
                let address = req.body.address;
                let pincode = req.body.pincode;
                let city = req.body.city;
                let states = req.body.states;
                let country = req.body.country;

                // let Address=req.body.Address;
                // console.log(Address)
                let addressData = { Address_id: Math.random(), address: address, pincode: pincode, city: city, states: states, country: country }
                console.log(addressData)
                data[0].Address.push(addressData)
                console.log(data)
                Users.updateOne({ email: email }, { $set: { Address: data[0].Address } }, (err, data) => {
                    if (err) {
                        res.json({  "err": "Address Not Added" }).status(400)
                    }
                    else {
                        res.status(200).json({  "msg": "Address added successfully", user_details: data });
                        console.log(data.Address)
                    }
                })
            }
        })


    },

    editaddress: (req, res) => {
        console.log("address edit section")
        console.log(req.body)
        Users.updateMany({}, {
            $set: {
                "Address.$[elem].address": req.body.address, "Address.$[elem].pincode": req.body.pincode,
                "Address.$[elem].city": req.body.city, "Address.$[elem].states": req.body.states, "Address.$[elem].country": req.body.country
            }
        },
            { arrayFilters: [{ "elem.Address_id": req.body.Address_id }] }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({  'err': "unable to Update address" }).status(400)
                }
                else {

                    Users.find({ email: req.body.email }, (err, data) => {
                        if (!data[0]) {
                            console.log('inside email not found');
                            res.json({"err": "Unable to genrate jwt" }).status(400)
                        }
                        else {
                            let payload = { uid: data }
                            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360 })
                            res.status(200).json({ "msg": "Address Updated Successfully", "token": token })
                        }
                    })
                }
            })

    },

    deleteaddress: (req, res) => {
        console.log("address delete section")
        console.log(req.body.Address_id)
        let email = req.params.email;
        let address_id = req.body.Address_id;

        Users.find({ email: req.params.email }, (err, data) => {
            if (err) {
                res.json({ err: 1, 'msg': "Unable to delete Address" }).status(400)
            }
            else {
                Users.updateOne({ email: email }, { $pull: { Address: { Address_id: address_id } } }, (err) => {
                    if (err) {
                        res.json({ 'err': "unable to do delete address" }).status(400)
                    }
                    else {
                        res.status(200).json({ "msg": "Address deleted succesfully" });
                    }
                })
            }
        })


    },

    changepassword: async (req, res) => {
        let id = req.params.id;
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);
        Users.updateOne({ _id: id }, { $set: { password: hashpassword } }, (err) => {
            if (err) {
                res.json({"err":"unable to update password" }).status(400)
            }
            else {
                res.status(200).json({ 'msg': "Password Updated Succesfully" });
            }
        })


    },


}

module.exports = profileCtrl

