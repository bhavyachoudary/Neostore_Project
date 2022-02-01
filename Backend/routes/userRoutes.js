const router = require('express').Router()
const userCtrl = require('../controllers/userControllers')
const jwt = require('jsonwebtoken');
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";
//const autenticateToken = require('../middleware/auth')


router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.post("/sociallogin", userCtrl.sociallogin)
router.put("/changepassword/:id", autenticateToken, userCtrl.changepass)
router.post("/sendmailotp", userCtrl.sendotp)
router.post("/forgotpassword", userCtrl.forgotpassword)

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

module.exports = router