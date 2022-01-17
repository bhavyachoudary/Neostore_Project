const express=require('express');
const router = express.Router();
const path=require('path')

const otpModel = require("../models/otpSchema")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
const credentials=require('../configFiles/Credentials')
const multer=require('multer')
const Users = require('../models/userSchema')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'E:/neostore/public/images')
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filename)
    }
})

const  upload = multer({storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } 
        else {
            req.fileValidationError = "Forbidden extension"
            cb(null, false, req.fileValidationError);
        }
    }
});
 router.post("/upload",upload.single('file') ,(req,res) => {
        if (req.file) {
        console.log(req.file)
        console.log(req.body)
        let imgpath =  req.file.filename;

        Users.updateOne({ email: req.body.email }, { $set: { imagePath:imgpath }},(err)=>{
            if (err){
                res.json({err:"error msg"})
            }
            else{
                res.json({msg:"successfully uploaded",image:imgpath})
            }
        });
    
       
    }
     
    });

 

function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
        res.json({"err":"Token not match"})
    }
    else {
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":"Token incorrect"})
            }
            else {
                res.json({"msg":" Token Matched"})
                next();
            }
        })
    }
}

router.get('/loginfirst', autenticateToken, (req, res) => {
    res.json({ "msg": "Token correct "})

})
//sociallogin
router.post("/sociallogin", (req, res) => {
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
            let ins = new Users({ name: req.body.name, lname: req.body.lname, email: req.body.email, password: "bhavyasociallogin" ,phone:9999888877,gender:"female"});
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

})
//add address
router.post("/addaddress" , (req, res) => {
    // let Address=[];
    console.log("address section")
    console.log(req.body)
    Users.find({ email: req.body.email }, (err, data) => {
            if (err) {
                res.json({ err: 1, 'msg': "Unable to Add Address" })
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
                let addressData = { Address_id: Math.random(),address: address, pincode: pincode, city: city, states: states, country: country }
                console.log(addressData)
                data[0].Address.push(addressData)
                console.log(data)
                Users.updateOne({ email: email }, { $set: { Address: data[0].Address } }, (err,data) => {
                    if (err) {
                        res.json({ 'err': 1, "msg": "Address Not Added" })
                    }
                    else {
                        res.json({ "err": 0, "msg": "Address added successfully",user_details:data });
                    console.log(data.Address)
                    }
                })
            }
        })
    })
    
    //edit address
    router.post("/editaddress", (req, res) => {
        console.log("address edit section")
        console.log(req.body)
        Users.updateMany({},{$set:{"Address.$[elem].address":req.body.address,"Address.$[elem].pincode":req.body.pincode,
        "Address.$[elem].city":req.body.city,"Address.$[elem].states":req.body.states,"Address.$[elem].country":req.body.country}},
        {arrayFilters:[{"elem.Address_id":req.body.Address_id}]},(err,data)=>{
            if(err){
                        console.log(err);
                        res.json({err:1,'msg':"unable to Update address"})
                    }
                    else{
                        
                        Users.find({email:req.body.email},(err,data)=>{
                            if(!data[0]){
                                console.log('inside email not found');
                                res.json({err:1,"msg":"Unable to genrate jwt"})
                            }
                            else{
                                let payload={uid:data}
                                const token=jwt.sign(payload,jwtSecret,{expiresIn:360})
                                res.status(200).json({"err":0,"msg":"Address Updated Successfully","token":token})
                                }
                        })
                    }
          })
        })

      
//delete address
router.post("/deleteadd/:email", (req, res) => {
    console.log("address delete section")
    console.log(req.body.Address_id)
    let email = req.params.email;
    let address_id = req.body.Address_id;
    
    Users.find({ email: req.params.email }, (err, data) => {
            if (err) {
                res.json({ err: 1, 'msg': "Unable to delete Address" })
            }
            else {
                Users.updateOne({ email: email }, {$pull:{Address:{Address_id:address_id}}}, (err) => {
                    if (err) {
                        res.json({ 'err':"unable to do delete address" })
                    }
                    else {
                        res.json({ "msg": "Do u want to delete address" });
                    }
                })
            }
        })
})


router.put("/changepass/:id",async(req,res)=>{
    let id = req.params.id;
    let password=req.body.password;
    
    const salt =await  bcrypt.genSalt(10);
    let hashpassword= await  bcrypt.hash(password,salt);
    Users.updateOne({_id:id},{$set:{password:hashpassword}},(err)=>{
        if(err) {
            res.json({err:err})
        }
        else{
            res.json({msg:"Password Updated Succesfully"});
        }
    })
})

router.put('/updprofile/:id', (req, res)=>{
    let id = req.params.id;
    let name = req.body.name;
    let lname = req.body.lname;
    let email = req.body.email;
    let phone = req.body.phone;
    console.log(name)
    // let password = req.body.password;
    Users.updateOne({_id:id},{$set:{name:name,lname:lname, email:email, phone:phone}}, (err)=>{
        if(err) res.json({err:err});
        res.json({msg:"Userprofile has Updated Succesfully"});
    })
})

router.get("/profile/:email",(req,res)=>{
    let email=req.params.email;
    Users.findOne({email:email},(err,data)=>{
        if(err) res.json({err:err})
        res.json({user:data,address:data.Address})
    })
})
router.put("/changepassword/:id",autenticateToken,async(req,res)=>{
    let id = req.params.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
 
    let phone = req.body.phone;
    let gender = req.body.gender;
    const salt = await bcrypt.genSalt(10);
    let hashpassword= await bcrypt.hash(password,salt);
    Users.updateOne({_id:id},{$set:{fname:fname,lname:lname, email:email, password:hashpassword,
        phone:phone,gender:gender}},(err)=>{
        if(err) res.json({err:err});
        res.json({msg:"Updated Succesfully"});
    })
})
router.post("/sendmailotp",async(req,res)=>{
    console.log(req.body.email);
    let data = await Users.findOne({email:req.body.email});
    if(data){
        let otpcode= Math.floor((Math.random()*10000)+1);
        console.log(otpcode)
        let otpData = new otpModel({
            email:req.body.email,
            code:otpcode,
            expiresIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        sendmail(otpcode,req.body.email)
        // res.json({"msg":"Email Sent "})
        res.json({"msg":otpcode})
    }else{
        res.json({"msg":"Email ID doesnt Exist"});
    }
})

router.post("/forgotpassword",async(req,res)=>{
    let data = await otpModel.find({email:req.body.email,code:req.body.otpcode})
   
    if(data){
        let currentTime =new Date().getTime();
        let diff = data.expiresIn - currentTime;
        if(diff<0){
            res.json({"msg":"Token Expires"})
        }else{
            let user = await Users.findOne({email:req.body.email})
            user.password = req.body.password;
            // user.confirmpassword=req.body.password;
            const salt = await bcrypt.genSalt(10);
            let hashpassword= await bcrypt.hash(user.password,salt);
            user.password=hashpassword;
            user.save();
            res.json({"msg":"Password Changed Successfully"})
        }
    }else{
            res.json({"msg":"Invalid Otp"})
    }
})

const nodemailer = require("nodemailer");
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

    module.exports = router;