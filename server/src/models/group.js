"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection")

const GroupSchema = new mongoose.Schema({

  creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

  members: [
        {
            type: String,
            required: true
        }
    ],

  title:{
    type: String,
    trim:true,
    required:true
  },

  description:{
    type: String,
    trim:true,
    required: true
  },

  location:{
    type:String,
    trim:true,
    required:true
  },

  banner:{
    type: String,
    trim:true,
    required:true
  },

},
    {
        collection: "groups",
        timestamps:true
    })
    
module.exports= mongoose.model("Group", GroupSchema)