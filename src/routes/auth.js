const express = require('express');
const User = require('../models/user')
const authRouter = express.Router();
const bcrypt = require('bcrypt');

authRouter.post('/signUp',async (req,res)=>{
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password,10);
    //console.log(passwordHash);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    })
    try{
        await user.save();
        res.send('User added succesfully');
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

authRouter.post('/login',async(req,res)=>{
    try{
        const{emailId,password} = req?.body;
        const isValidUser = await User.findOne({emailId:emailId});
    if(!isValidUser){
        throw new Error('Invalid credintials');
    }else{
        const isValidPassword = isValidUser.checkIsPasswordvalid(password);
        if(isValidPassword){
            const token = await isValidUser.signJWTToken();
            res.cookie('token',token);
            res.send('Login Successfull');     
        }else{
            throw new Error('Invalid credintials');
        }
    }
    }catch(err){
        res.send("ERROR: "+err.message);
    }
})

module.exports  = authRouter;