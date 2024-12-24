const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello from /');
})

app.get('/home',(req,res)=>{l
    res.send('Hello from /home');
})

app.get('/about',(req,res)=>{
    res.send('Hello from /about');
})

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
})