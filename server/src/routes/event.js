"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require('../controllers/event');
const { isLogin, isAdmin, isStaff } = require('../middlewares/permissions');

// URL: /category

router.route('/').get(isLogin, list).post(isLogin, create);

router.route('/:id')
    .get(isLogin, read)
    .put(isStaff, update)
    .patch(isStaff, update)
    .delete(isStaff, deletee);

/* ------------------------------------------------------- */
module.exports = router;
