"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { login, refresh, logout, register } = require('../controllers/auth');

// URL: /auth

router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refresh);
router.get('/logout', logout);

/* ------------------------------------------------------- */
module.exports = router;