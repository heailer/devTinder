const express = require('express');
const {adminAuth} = require('./middleware/auth');
const connectDb = require('./config/dataBase');
const app = express();
const User = require('./models/user');

app.post('/user',async (req,res)=>{
    const user = new User({
        firstName:'Amog',
        lastName:'Guntha',
        emailId:'heythisisamog@gmail.com',
        password:'amog123'
    });
    await user.save();
    res.send('User added succesfully');
})

connectDb().then(()=>{
    console.log('Database connected.......');
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });
}).catch((err)=>{    
    console.log('Database not connected!!!!!');
});



