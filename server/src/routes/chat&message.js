"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()

/* ------------------------------------------------------- */

const { chatlist, messagelist,  messageChatCreate, deletee } = require('../controllers/chat&message');
const { isLogin, isAdmin, isStaff } = require('../middlewares/permissions');

// URL: /chats

router.route('/').get(isLogin, chatlist)
router.route('/messages/:chatId').get(isLogin, chatlist)
router.route('/messages/:chatId').get(isLogin, messagelist)
router.route('/messages').post(isLogin, messageChatCreate)
router.route('/:id').delete(isLogin, deletee)

/* ------------------------------------------------------- */
module.exports = router;