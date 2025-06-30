"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')

const ProfileSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        enum:[null, "M","F"],
        default:null
    },

    birthDate:{
        type: Date,
        required:true
    },

    city: {
        type: String,
        trim: true,
        required: true,
    },

    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    },

    interests:[
        {
            type: String,
            required: true
        }
    ],

}, {
    collection:"profiles",
    timestamps:true
})

module.exports = mongoose.model("Profile", ProfileSchema)