"use strict"
/* -------------------------------------------------------
    
------------------------------------------------------- */
// app.use(authentication):

const jwt = require('jsonwebtoken');


module.exports = async (req, res, next) => {

    req.user = null;

    const auth = req.headers?.authorization || null // Token ...tokenKey... // Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] // ['Bearer', '...accessToken...']

    if (tokenKey) {



        if (tokenKey[0] == 'Bearer') { // JWT
            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, userData) => userData ? req.user = userData : req.user = null);
        }
    };

    next()
}