const express = require('express');
const {userAuth} = require('../middleware/auth');
const profileRouter = express.Router();

profileRouter.get('/profile',userAuth,async (req,res)=>{
    try{
        res.send(req.user);
    }catch(err){
        res.status(400).send('Something didnt work');
    }
})

module.exports = profileRouter;