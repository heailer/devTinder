const mongoose = require('mongoose');

const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://heythisisamog:5QP3L8F1U8hanryX@merncluster.h7k6m.mongodb.net/?retryWrites=true&w=majority&appName=MERNcluster');
};




module.exports = connectDb;

