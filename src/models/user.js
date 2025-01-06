const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {validatePassword} = require('../utils/validations');
//src\utils\passwordValidator.js
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:30,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        maxLength:50,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            const result=  validatePassword(value);
            if(result.isValid===false){
                console.log(result.error);
                throw new Error(result.error.join(','));
            }
            
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
            if(['male','female','others'].includes(value)===false){
                throw new Error('Gender not available');
            }
        }
    },
    photoUrl:{
        type:String,
        default:'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695396.jpg',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid URL');
            }
        }
    },
    about:{
        type:String,
        default:'This is default about'
    },
    skills:{
        type:[String]
    }
    
},{timestamps:true});

userSchema.methods.checkIsPasswordvalid = async function(password){
    const user = this;
    const hashPassword = user.password;

    const isValidPassword = await bcrypt.compare(password,hashPassword); 
    return isValidPassword;
}

userSchema.methods.signJWTToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},'Appu@2009');
    return token;
}

const User = mongoose.model('User',userSchema);
module.exports = User; 