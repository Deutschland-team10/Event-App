"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require('../controllers/event');
const { isLogin, isStaff } = require('../middlewares/permissions');
const upload = require('../middlewares/upload'); // Upload middleware eklendi

// URL: /event

router.route('/')
    .get(isLogin, list)
    .post(isLogin, upload.single('image'), create); // Upload middleware eklendi

router.route('/:id')
    .get(isLogin, read)
    .put(isStaff, upload.single('image'), update) // Upload middleware eklendi
    .patch(isStaff, upload.single('image'), update) // Upload middleware eklendi
    .delete(isStaff, deletee);

/* ------------------------------------------------------- */
module.exports = router;
