"use strict"



/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
// Middleware: permissions
const Event = require('../models/event')

module.exports = {

    isLogin: (req, res, next) => {

        // any User:
        if (req.user && req.user.isActive) {

            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }
    },

    isAdmin: (req, res, next) => {

        // only Admin:
        if (req.user && req.user.isActive && req.user.isAdmin) {

            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }
    },
    isStaff: (req, res, next) => {

        // only Admin or Staff:
        if (req.user && req.user.isActive && (req.user.isAdmin || req.user.isStaff)) {

            next()

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Staff.')
        }
    },
    isOwnEvent: async (req, res, next) => {

        // only Admin or Staff:
        if (req.user && req.user.isActive) {
            const event = await Event.findById(req.params.id)
            if ((event.creater.toString() === req.user._id.toString()) || req.user.isAdmin) {
                next()

            } else {
                res.errorStatusCode = 403
                throw new Error('NoPermission: You must be the creator of the event or an Admin.')
            }

        } else {

            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Staff.')
        }
    }

}