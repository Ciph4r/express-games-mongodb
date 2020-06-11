const gamename = require('../controllers/gameController')

module.exports = {
    enter: (req,res)=> {
        
        return res.status(200).json({comfirmation: 'success' , Welcome : `You have entered the correct secret  ${{}} `})
    }
}


