const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
const nodemailer = require('nodemailer')
const otpModel = require("../models/otpSchema")

function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Token Matched")
                next();
            }
        })
    }
}

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
                res.json({ "err": "Please fill the form" })
            } else {
                res.json({ "msg": "Registered successfully" })
            }

        })

    },

    login: async (req, res) => {

        try {
            let email = req.body.email;
            let password = req.body.password;
            console.log(password)

            const user = await Users.findOne({ email })
            console.log(user)
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(isMatch)

            if (email === user.email && isMatch) {
                let payload = {
                    uid: email
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600009 })
                res.json({ "msg": "Login Successfull", "token": token })
            }
            else if (!email) {
                res.json({ err: 'You must enter an email address.' });
            }
            else if (!password) {
                res.json({ err: 'You must enter a password.' });
            }

            else {
                res.json({ "err": "Please Enter valid credintails" })
            }
        }
        catch (err) {
            res.json({ "err": 'Please Fill the form.' })

        }


    },

    sociallogin: (req, res) => {
        // console.log(req.body)
        let payload = {
            name: req.body.name,
            lname: req.body.lname,
            email: req.body.email
        }
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
        Users.findOne({ email: req.body.email }).exec((err, data) => {
            if (err) {
                res.json({ "show": true, "msg": "Somethong Went Wrong" })
            }
            else if (data == null) {
                let ins = new Users({ name: req.body.name, lname: req.body.lname, email: req.body.email, password: "bhavyasociallogin", phone: 9999888877, gender: "female" });
                ins.save((err) => {
                    if (err) { res.json({ "show": true, "msg": "Somethong Went Wrong" }) }
                    else { res.json({ "show": false, "msg": "Login Success", "token": token }) }
                })
            }
            else if (data.password == "Social Logger") {
                res.json({ "show": false, "msg": "Login Success", "token": token })
            }
            else {
                res.json({ "show": true, "msg": "This Is A Email Registered For Login " })
            }
        })
    },

    forgotpassword: async (req, res) => {
        let data = await otpModel.find({ email: req.body.email, code: req.body.otpcode })

        if (data) {
            let currentTime = new Date().getTime();
            let diff = data.expiresIn - currentTime;
            if (diff < 0) {
                res.json({ "msg": "Token Expires" })
            } else {
                let user = await Users.findOne({ email: req.body.email })
                user.password = req.body.password;
                // user.confirmpassword=req.body.password;
                const salt = await bcrypt.genSalt(10);
                let hashpassword = await bcrypt.hash(user.password, salt);
                user.password = hashpassword;
                user.save();
                res.json({ "msg": "Password Changed Successfully" })
            }
        }
        else {
            res.json({ "msg": "Invalid Otp" })
        }
    },

    sendotp: async (req, res) => {
        console.log(req.body.email);
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
            res.json({ "msg": "OTP sent to Email", otpcod: otpcode })
        } else {
            res.json({ "msg": "Email ID doesnt Exist" });
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
            if (err) res.json({ err: err });
            res.json({ msg: "Updated Succesfully" });
        })
    }
}


    function sendmail(otpcode,email){
    let mailTransporter = nodemailer.createTransport({
        service:"gmail",
        port:587,
        secure:false,
        auth:{
            user : credentials.email,
            pass : credentials.password,
        },
    });
        let mailDetails = {
        from: credentials.email,
        to: `${email}`,
        subject: 'OTP for NeoSTORE',
        text: `YOUR OTP IS ${otpcode}`,
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
      if(err) {
          console.log(err);
      } else {
          console.log('Email sent successfully');
      }
    });
    }

module.exports = userCtrl

