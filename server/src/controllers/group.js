"use strict"
/* -------------------------------------------------------
                Group Project
------------------------------------------------------- */
const Group = require("../models/group");
const User = require("../models/user");

module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags=["Groups"]
        #swagger.summary="List Groups"
        #swagger.description=`
         You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>`      
        
        */

    const result = await res.getModelList(Group);


    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Group),
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
        
        */
    const memberInfos = req.body.members || [];
    const memberIds = [];
    let user;

    for (let info of memberInfos) {
      if (typeof info === "object") {
        user = await User.findOne({ email: info.email });
        if (!user) {
          user = await User.create({ ...info });
        }
      } else if (typeof info === "string") {
        user = await User.findById(info);
      }

      if (user) memberIds.push(user._id);
    }

    const result = await Group.create({
      creater: req.user._id,
      members: memberIds,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      banner: req.body.banner,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).send({
      error: false,
      message: "Group created successfully",
      result
    });
  },

  read: async (req, res) => {
    /*
     #swagger.tags=["Users"]
     #swagger.summary="Read Event"
    */

    const result = await Event.findOne({ _id: req.params.id }).populate([
      { path: 'creater', select: 'username email' },
      { path: 'members', select: "firstName lastName email" }
    
    ]);

    res.status(200).send({
      error: false,
      result,
    });
  },

   update: async (req, res) => {
      /* 
          #swagger.tags=["Groups"]
          #swagger.summary="Update Groups"
          #swagger.parameters['body']={
              in:"body",
              require:true,
              schema:{
                $ref:'#/definitions/Group',
              }
          
          }
          
          */
      const result = await Group.updateOne({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
  
      res.status(202).send({
        error: false,
        result,
      });
    },

    deletee: async (req, res) => {
        const result = await Group.deleteOne({ _id: req.params.id });
    
        res.status(result.deletedCount ? 204 : 404).send({
          error: !result.deletedCount,
          message: "Group is not found or already deleted",
        });
      },
}