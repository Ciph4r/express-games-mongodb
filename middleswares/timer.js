const moment = require('moment')

const timer = (req,res,next) => {
    console.log(moment().format('LLL'))
    next()
}

module.exports = timer