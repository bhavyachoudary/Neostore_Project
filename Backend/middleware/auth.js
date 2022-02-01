const jwt = require('jsonwebtoken')
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

const autenticateToken = (req, res, next) =>{
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

module.exports=autenticateToken;
