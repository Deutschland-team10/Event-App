"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, deletee } = require('../controllers/message');
const { isLogin, isAdmin, isStaff } = require('../middlewares/permissions');

// URL: /message

router.route('/').get(isLogin, list).post(isLogin, create);

router.route('/:id')
    .get(isLogin, read)
    .delete(isStaff, deletee);

/* ------------------------------------------------------- */
module.exports = router;