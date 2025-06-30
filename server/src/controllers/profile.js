"use strict"
/* -------------------------------------------------------
                Profile Project
------------------------------------------------------- */

const Profile = require('../models/profile');
const User = require("../models/user");

module.exports = {
    list: async (req, res) => {
        /*
            #swagger.tags=["Profiles"]
            #swagger.summary="List Profiles"
            #swagger.description=`
             You can send query with endpoint for filter[], search[], sort[], page and limit.
                    <ul> Examples:
                        <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                        <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                        <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                        <li>URL/?<b>page=2&limit=1</b></li>
                    </ul>`      
            
            */
    
        const result = await res.getModelList(Profile);
    
    
        res.status(200).send({
          error: false,
          details: await res.getModelListDetails(Profile),
          result,
        });
      },

      create: async (req, res) => {
        /* 
            #swagger.tags=["Profiles"]
            #swagger.summary="Create Profiles"
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                 $ref:'#/definitions/Profile',
    
                }
            
            }
            
            */
    
    
        const existingProfile = await Profile.findOne({ user: req.body.user});
        if (existingProfile) {
            return res.status(400).send({
                error: true,
                message: "This user already has a profile.",
            });
        }

       const result = await Profile.create({
        creater: req.user._id,
        participants: participantIds,
        sharedGroup: groupIds,
        categoryId: req.body.categoryId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    
      res.status(201).send({
        error: false,
        message: "Profile created successfully",
        result,
      });
    
      },
    
      read: async (req, res) => {
        /*
         #swagger.tags=["Profiles"]
         #swagger.summary="Read Profile"
        */
    
        const result = await Profile.findOne({ _id: req.params.id }).populate([
                { path: 'user', select: 'username email image' },
            ]);
    
        res.status(200).send({
          error: false,
          result,
        });
      },
    
      update: async (req, res) => {
        /* 
            #swagger.tags=["Profiles"]
            #swagger.summary="Update Profiles"
            #swagger.parameters['body']={
                in:"body",
                require:true,
                schema:{
                  $ref:'#/definitions/Profile',
                }
            
            }
            
            */
        const result = await Profile.updateOne({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        });
    
        res.status(202).send({
          error: false,
          result,
        });
      },
    
      deletee: async (req, res) => {
        const result = await Profile.deleteOne({ _id: req.params.id });
    
        res.status(result.deletedCount ? 204 : 404).send({
          error: !result.deletedCount,
          message: "Profile is not found or already deleted",
        });
      },
}