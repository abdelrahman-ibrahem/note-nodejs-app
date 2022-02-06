const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req , res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if (user){
            return res.status(400).json({status: "failed", message: "this account is already exists"});
        }
        const newUser = await User.create(req.body);
        res.status(200).json({
            status: "success",
            user: {
                id :newUser._id,
                email :newUser.email,
                username :newUser.username,
            }
        });
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};


exports.login = async (req , res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(400).json({
                status: "failed",
                message: "this email is not found, please register first"
            });
        }
        const correct = await bcrypt.compare(req.body.password , user.password);
        if (!correct){
            return res.status(400).json({
                status: "failed",
                message: "invalid password"
            });
        }
        const token = jwt.sign({id: user._id} , 'jwtPrivateKey' , {
            expiresIn: '12h'
        });
        res.cookie('jwt' , token, {
            httpOnly: true
        });
        res.status(200).json({
            status: "success",
            token,
            user: {
                id :user._id,
                email :user.email,
                username :user.username,
            }
        });
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        });
    }
};


exports.checkAuth = async (req , res , next) =>{ 
    try{
        
        const token = req.headers.authorization;
        const decoded = jwt.verify(token , 'jwtPrivateKey');
        const current = await User.findById(decoded.id);
        req.user = current;
        next();
    }catch(err){
        next();
        // res.status(404).json({
        //     status: "failed",
        //     message: err.message
        // });
    }
}



exports.checkAuthView = async (req , res , next)=>{
    try{
        
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token , 'jwtPrivateKey');
        const current = await User.findById(decoded.id);
        req.user = current;
        next();
    }catch(err){
        next();
        
    }
};