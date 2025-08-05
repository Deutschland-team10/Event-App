"use strict"
/* -------------------------------------------------------
               | Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee, joinEvent } = require('../controllers/event');
const { isLogin, isStaff, isOwnEvent } = require('../middlewares/permissions');
const upload = require('../middlewares/upload'); // Upload middleware eklendi

// URL: /event

router.route('/')
    .get(isLogin, list)
    .post(isLogin, upload.single('image'), create); // Upload middleware eklendi


router.put('/join/:eventId', joinEvent )

router.route('/:id')
    .get(isLogin, read)
    .put(isLogin,isOwnEvent, upload.single('image'), update) // Upload middleware eklendi
    .patch(isLogin,isOwnEvent, upload.single('image'), update) // Upload middleware eklendi
    .delete(isLogin,isOwnEvent, deletee);

/* ------------------------------------------------------- */
module.exports = router;
