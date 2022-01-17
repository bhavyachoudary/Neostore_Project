const Users = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = "ddsfftyy677yttfff";
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')



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


    }

}
module.exports = userCtrl

