"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const router = require('express').Router()

router.use('/auth', require('./auth'));

router.use('/users', require('./user'));

router.use('/tokens', require('./token'));

router.use('/events', require('./event'));

router.use('/groups', require('./group'));

router.use('/categories', require('./category'));

router.use('/chats', require('./chat&message'));

router.use('/profile', require('./profile'));

module.exports = router;