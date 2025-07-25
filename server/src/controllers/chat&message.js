"use strict";
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */

const Message = require("../models/message");
const Chat = require("../models/chat");

module.exports = {
  chatlist: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "List Messages"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

    //const result = await res.getModelList(message);
  
    const result = await Chat.find({ users: req.user._id });

    res.status(200).send({
      error: false,

      result,
    });
  },

  messagelist: async (req, res) => {
    /*
        #swagger.tags = ["Messages"]
        #swagger.summary = "List Messages of a Chat"
        #swagger.description = `
            Belirli bir chat'e ait tüm mesajları listeler.
            <ul> Örnek:
                <li>URL: /api/messages/:chatId</li>
            </ul>
        `
    */

    const result = await Message.find({ chatId: req.params.chatId });

    res.status(200).send({
      error: false,
      result,
    });
  },

  messageChatCreate: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Create message"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/message"
                }
            }
        */

    // content senderId chatId veya reciverId
    // eger ki chatid gönderilmisse bu chat zaten bulunmakta, yeni bir chat olusturma
    // eger ki chatId yok ise yeni bir chat olustur
    const { receiverId, content, chatId } = req.body;
    console.log(req.user._id, receiverId, content, chatId);

    let chat = null;

    if (!chatId) {
      chat = await Chat.create({
        users: [req.user._id, receiverId],
      });
      console.log(chat);
    }

    const message = await Message.create({
      sender: req.user._id,
      chatId: chat ? chat._id : chatId,
      content,
    });
    res.status(201).send({
      error: false,
      message: "Message sent successfully",
      result: message,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Get Single message"
        */

    const result = await Message.findById(req.params.id);

    res.status(200).send({
      error: false,
      result,
    });
  },

  deletee: async (req, res) => {
    /*
            #swagger.tags = ["Messages"]
            #swagger.summary = "Delete message"
        */

    const result = await Chat.deleteOne({ _id: req.params.id });

    res.status(result.deletedCount ? 204 : 404).send({
      error: !result.deletedCount,
      message: result.deletedCount
        ? "Data deleted."
        : "Data is not found or already deleted.",
      result,
    });
  },
};
