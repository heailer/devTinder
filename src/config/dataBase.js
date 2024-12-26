const mongoose = require('mongoose');

const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://heythisisamog:5QP3L8F1U8hanryX@cluster0.h7k6m.mongodb.net/devTinder');
};

module.exports = connectDb;

