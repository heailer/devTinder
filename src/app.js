const express = require('express');
const {adminAuth} = require('./middleware/auth');
const connectDb = require('./config/dataBase');
const app = express();
const User = require('./models/user');


app.use(express.json());

app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({
            emailId:userEmail
        })
        if(user.length===0){
            res.status(404).send('User not found');
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(400).send('Something didnt work');
    }
})

app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({});
        if(users.length===0){
            res.status(404).send('No users found');
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send('Something didnt work');
    }
})

app.post('/signUp',async (req,res)=>{
    const user = new User(req.body);
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



