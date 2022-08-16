const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

module.exports.checkUser = (req, res, next) => {
    const token = req.cookie.jwt
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken)=> {
            if(err){
                res.local.user = null
                res.cookie('jwt', '' , {maxAge : 1})
                next()
            }
            else{
                let user = await UserModel.findById(decodedToken.id)
                res.locals.user= user
                console.log(user);
                next()
            }
        })
    }else {
        res.local.user = null
        next()
    }
}