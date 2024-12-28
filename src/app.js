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
    try{
        await user.save();
        res.send('User added succesfully');
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

app.delete('/user',async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send('Something didnt work');
    }
})

app.patch('/user/:userId',async(req,res)=>{
    const user = req.body;
    const userId = req?.params.userId;
    const ALLOW_UPDATES = ['photoUrl','about','skills'];
    const isUpdateAllowed = Object.keys(user).every((key)=>{
        return ALLOW_UPDATES.includes(key);
    });
    if(!isUpdateAllowed){
        throw new Error('Invalid updates');
    }
    if(user?.skills.length>5){
        throw new Error('Skills should be less than 5');
    }
    if(user?.about.length>400){
        throw new Error('About should be less than 400 characters');
    }
    if(user?.photoUrl.length>200){
        throw new Error('Photo url should be less than 200 characters');
    }
    
    try{
        const newUpdate = await User.findByIdAndUpdate(userId,user,{returnDocument:'after',runValidators:true});
        console.log(newUpdate);
        res.send('Update Succesfull');
    }
    catch(err){
        res.status(400).send('Something didnt work: '+ err.message);
    }

})

connectDb().then(()=>{
    console.log('Database connected.......');
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });
}).catch((err)=>{    
    console.log('Database not connected!!!!!');
});



