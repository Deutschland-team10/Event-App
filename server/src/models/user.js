"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const {mongoose}= require("../configs/dbConnection")
const passwordEncrypt = require("../helpers/passwordEncrypt")
const emailValidation= require("../helpers/emailValidation")


const UserSchema= new mongoose.Schema({

username:{
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true
},

password:{
    type: String,
    trim: true,
    required: true,
    set: (password) => passwordEncrypt(password),
},

email:{
    type: String,
    trim: true,
    required: [true, "An Email address is required"],
    unique: true, // mongodb uniqe veriler için kendi mesajını gönderir
    validate: [(email) =>emailValidation(email),"Email format is not valid"]

},
firstName: {
    type: String,
    trim: true,
    required: true,
 },
 lastName: {
    type: String,
    trim: true,
    required: true,
 },
 isActive: {
    type: Boolean,
     default: true
},

  isAdmin: {
    type: Boolean,
    default: false
 },
 isStaff: {
    type: Boolean,
    default: false
 },
 
  image: {
     type: String,
     trim: true
 }


},{
    collection:"users",
    timestamps:true
})

module.exports= mongoose.model('User', UserSchema)