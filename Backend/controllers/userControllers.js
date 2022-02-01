const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
// const nodemailer = require('nodemailer')
const otpModel = require("../models/otpSchema");
const credentials = require('../configFiles/Credentials')


const userCtrl = {

    register: async (req, res) => {
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
        let gender = req.body.gender

        const passwordHash = await bcrypt.hash(password, 10)
        let ins = new Users({ name: name, lname: lname, email: email, password: passwordHash, phone: phone, gender: gender });
        await ins.save((err) => {
            if (err) {
                res.json({ "err": "Please fill the form" }).status(400)
            }
            else {
                res.status(200).json({ "msg": "Registered successfully"})
            }
        })
    },

    login: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        console.log(password)

        const user = await Users.findOne({ email: email })
        console.log(user)

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(isMatch)
            if (email === user.email && isMatch) {
                let payload = {
                    uid: email
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
                res.status(200).json({ "msg": "Login Successfull", "token": token })
            }
            else {
                res.json({ err: 'You must enter a password.' }).status(400);
            }
        }
        else {
            res.json({ "err": "Please Enter valid credintails" }).status(400)
        }

    },

    sociallogin: async (req, res) => {
        console.log(req.body)
        let name = req.body.name;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = "bhavyasociallogin";

        const passwordHash = await bcrypt.hash(password, 10)
        Users.findOne({ email: req.body.email }).exec((err, data) => {
            if (err) {
                res.json({ "msg": "Somethong Went Wrong" })
            }
            else if (data == null) {
                let ins = new Users({ name: name, lname: lname, email: email, password: passwordHash, phone: "9666777553", gender: "female" });
                ins.save((err) => {
                    if (err) {
                        res.json({ "msg": "Somethong Went Wrong" }).status(400);
                    }
                    else {
                        res.status(200).json({ "msg": "Login Success" }).status(400);
                    }
                })
            }
            else {
                res.status(200).json({ "msg": "This is a Email Registered For Login " })
            }
        })

    },

    forgotpassword: async (req, res) => {
        let data = await otpModel.find({ email: req.body.email, code: req.body.otpcode })

        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expiresIn - currentTime;
            if (diff < 0) {
                res.status(200).json({ "msg": "Token Expires" })
            } else {
                let user = await Users.findOne({ email: req.body.email })
                user.password = req.body.password;
                // user.confirmpassword=req.body.password;
                const salt = await bcrypt.genSalt(10);
                let hashpassword = await bcrypt.hash(user.password, salt);
                user.password = hashpassword;
                user.save();
                res.status(200).json({ "msg": "Password Changed Successfully" })
            }
        }
        else {
            res.json({ "msg": "Invalid Otp" }).status(400);
        }
    },

    sendotp: async (req, res) => {
        //console.log(req.body.email);
        let data = await Users.findOne({ email: req.body.email });
        if (data) {
            let otpcode = Math.floor((Math.random() * 10000) + 1);
            console.log(otpcode)
            let otpData = new otpModel({
                email: req.body.email,
                code: otpcode,
                expiresIn: new Date().getTime() + 300 * 1000
            })
            let otpResponse = await otpData.save();
            sendmail(otpcode, req.body.email)
            // res.json({"msg":"Email Sent "})
            res.status(200).json({ "msg": "OTP sent to Email", otpcod: otpcode })
        } else {
            res.json({ "msg": "Email ID doesnt Exist" }).status(400);
        }
    },

    changepass: async (req, res) => {
        let id = req.params.id;
        let fname = req.body.fname;
        let lname = req.body.lname;
        let email = req.body.email;
        let password = req.body.password;

        let phone = req.body.phone;
        let gender = req.body.gender;
        const salt = await bcrypt.genSalt(10);
        let hashpassword = await bcrypt.hash(password, salt);
        Users.updateOne({ _id: id }, {
            $set: {
                fname: fname, lname: lname, email: email, password: hashpassword,
                phone: phone, gender: gender
            }
        }, (err) => {
            if (err) res.json({ err: err }).status(400);;
            res.status(200).json({ msg: "Updated Succesfully" });
        })
    }

}

const nodemailer = require('nodemailer')
function sendmail(otpcode, email) {
    console.log(credentials.email)
    console.log(email)
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: credentials.email,
            pass: credentials.password,
        },
        tls: {
            rejectUnAuthorized: true
        }
    });
    let mailDetails = {
        from: credentials.email,
        to: `${email}`,
        subject: 'OTP for NeoSTORE',
        text: `YOUR OTP IS ${otpcode}`,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });
}


module.exports = userCtrl

