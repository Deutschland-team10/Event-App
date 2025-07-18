"use strict";
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */

const Event = require("../models/event");
const User = require("../models/user");
const Group = require("../models/group");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags=["Events"]
            #swagger.summary="List Events"
            #swagger.description=`
             You can send query with endpoint for filter[], search[], sort[], page and limit.
                    <ul> Examples:
                        <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                        <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                        <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                        <li>URL/?<b>page=2&limit=1</b></li>
                    </ul>`
        */

        const result = await res.getModelList(Event);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Event),
            result,
        });
    },

    create: async (req, res) => {
        /* 
            #swagger.tags=["Events"]
            #swagger.summary="Create Events"
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                 $ref:'#/definitions/Event',
                }
            }
            #swagger.parameters['image']={
                in:"formData",
                type:"file",
                required:false,
                name:"image"
            }
        */

        const participantInfos = req.body.participants || [];
        const groupInfos = req.body.sharedGroup || [];
        const imagePath = req.file ? '/uploads/' + req.file.filename : null;

        const participantIds = [];
        const groupIds = [];

        let user, group;

        for (let info of participantInfos) {
            if (typeof info === "object") {
                user = await User.findOne({ email: info.email });
                if (!user) {
                    user = await User.create({ ...info });
                }
            } else if (typeof info === "string") {
                user = await User.findById(info);
            }

            if (user) participantIds.push(user._id);
        }

        for (let info of groupInfos) {
            if (typeof info === "object") {
                group = await Group.findOne({ title: info.title });
                if (!group) {
                    group = await Group.create({ ...info, creater: req.user._id });
                }
            } else if (typeof info === "string") {
                group = await Group.findById(info);
            }

            if (group) groupIds.push(group._id);
        }

        const result = await Event.create({
            creater: req.user._id,
            participants: participantIds,
            sharedGroup: groupIds,
            categoryId: req.body.categoryId,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            image: imagePath,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).send({
            error: false,
            message: "Event created successfully",
            result,
        });
    },

    read: async (req, res) => {
        /*
         #swagger.tags=["Events"]
         #swagger.summary="Read Event"
        */

        const result = await Event.findOne({ _id: req.params.id }).populate([
            { path: "creater", select: "username email" },
            { path: "participants", select: "firstName lastName email" },
            { path: "sharedGroup", select: "title location" },
            { path: "categoryId", select: "name" },
        ]);

        res.status(200).send({
            error: false,
            result,
        });
    },

    update: async (req, res) => {
        /* 
            #swagger.tags=["Events"]
            #swagger.summary="Update Events"
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                  $ref:'#/definitions/Event',
                }
            }
            #swagger.parameters['image']={
                in:"formData",
                type:"file",
                required:false,
                name:"image"
            }
        */

        // Eğer yeni bir resim yüklendiyse
        if (req.file) {
            updateData.image = '/upload/' + req.file.filename;
        }

        const result = await Event.updateOne({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(202).send({
            error: false,
            result,
        });
    },

    deletee: async (req, res) => {
        const result = await Event.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            message: "Event is not found or already deleted",
        });
    },
};
