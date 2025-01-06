const express = require('express');
const { userAuth } = require('../middleware/auth');
const requestsRouter = express.Router();

requestsRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    const user = req.user;
    console.log('Connection request sent by '+user.firstName);
    res.send('Connection request sent');
})

module.exports = requestsRouter;