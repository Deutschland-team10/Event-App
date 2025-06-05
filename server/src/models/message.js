"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const {mongoose}= require("../configs/dbConnection")

const MessageSchema = new mongoose.Schema({

    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event",  
    }
}, {
    collection: "messages",
    timestamps: true

});

module.exports = mongoose.model("Message", MessageSchema);