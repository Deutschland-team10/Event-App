"use strict";
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */

const User = require("../models/user");

module.exports = {
    list: async (req, res) => {
        /*
                #swagger.tags = ["Users"]
                #swagger.summary = "List Users"
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

        const result = await res.getModelList(User);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            result,
        });
    },

    read: async (req, res) => {
        /*
                #swagger.tags = ["Users"]
                #swagger.summary = "Get Single User"
            */

        const result = await User.findById(req.params.id);

        res.status(200).send({
            error: false,
            result,
        });
    },

    update: async (req, res) => {
        /*
                #swagger.tags = ["Users"]
                #swagger.summary = "Update User"
                #swagger.parameters['body'] = {
                    in: 'body',
                    required: true,
                    schema: {
                        "username": "test",
                        "password": "1234",
                        "email": "test@site.com",
                        "firstName": "test",
                        "lastName": "test",
                    }
                }
            */

        if (req.user._id.toString() !== req.params.id.toString()) {
            throw new Error("You can not update someone else profile");
        }
        const result = await User.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });

        res.status(200).send({
            error: false,
            user: await User.findById(req.params.id),
        });
    },

    deletee: async (req, res) => {
        /*
                #swagger.tags = ["Users"]
                #swagger.summary = "Delete User"
            */

        if (req.user.id !== req.params.id.toString()) {
            throw new Error("You can only delete your own profile");

        };


        const result = await User.deleteOne({ _id: req.params.id });

        res.status(result.deletedCount ? 204 : 404).send({
            error: !result.deletedCount,
            message: result.deletedCount
                ? "Data deleted."
                : "Data is not found or already deleted.",
            result,
        });
    },
};
