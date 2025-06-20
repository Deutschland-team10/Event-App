"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const {mongoose}= require("../configs/dbConnection")

const ChatSchema = new mongoose.Schema({

    chatName: {
        type: String,
        default:null
    },

    chatPicture:{
        type: String,
        default:null
    },
    users: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:null
    }
   
}, {
    collection: "chats",
    timestamps: true

});

module.exports = mongoose.model("Chat", ChatSchema);