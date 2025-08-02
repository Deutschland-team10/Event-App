"use strict";
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");

const EventSchema = new mongoose.Schema(
  {
    creater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
      },
    ],

    sharedGroup: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        
      },
    ],

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      trim: true,
      required: true,
    },

    location: {
      type: String,
      trim: true,
      required: true,
    },

    image: {
      type: String,
    },
  },

  {
    collection: "events",
    timestamps: true,
  }
);
module.exports = mongoose.model("Event", EventSchema);
