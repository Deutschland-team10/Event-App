"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { chatlist } = require('../controllers/chat&message');
const { isLogin, isAdmin, isStaff } = require('../middlewares/permissions');

// URL: /chats

router.route('/').get(isLogin, chatlist)


/* ------------------------------------------------------- */
module.exports = router;