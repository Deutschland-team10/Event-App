"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const {mongoose}= require("../configs/dbConnection")

const MessageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    
    content: {
        type: String,
        required: true,
    },
    
}, {
    collection: "messages",
    timestamps: true

});

module.exports = mongoose.model("Message", MessageSchema);