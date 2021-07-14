require("dotenv").config()
const secret = process.env.JWT_TOKEN

const jwt = require("jsonwebtoken")

const User = require("../models/user")

const WithAuth = (req, res, next) =>{
    const token = req.headers['x-access-token']
    if(!token){
        res.status(401).json({error: "Unauthorized: no token provided"})
    }else{
        jwt.verify(token, secret, (err, decode) =>{
            if(err){
                res.status(401).json({error: "Unauthorized: invalid token"})
            }else{
                req.email = decode.email //pega o token decodado e coloca na requisicao
                User.findOne({email: decoded.email})
                .then(user =>{
                    req.user = user
                    next()
                }).catch(error =>{
                    res.status(401).json({error: error})
                })
            }
        })
    }
}

module.exports = WithAuth