"use strict"
/* -------------------------------------------------------
                Event Project
------------------------------------------------------- */
// dateToLocaleString(date:Date):

module.exports = function (dateData) {
    return dateData.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
}

// 26 mart Perşembe 2025   14.19