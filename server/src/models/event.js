"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection")

const EventSchema = new mongoose.Schema({

    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    participants: [
        {
            type: String,
           //required: true {event katilimcilar olmadan da olusturulabilir}
        }
    ],

    sharedGroup: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
           // required: true,
        }
    ],

    categoryId: {
        type: String,
        required: true
    },

    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        trim: true,
        required: true
    },

    location: {
        type: String,
        trim: true,
        required: true
    },

    image: {
        type: String,
        trim: true,
    },
},

    {
        collection: "events",
        timestamps: true
    }
)
module.exports = mongoose.model("Event", EventSchema)
