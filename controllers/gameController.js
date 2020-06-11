const Game = require('../models/gamesdb')
const secrectpath = require('../routes/mainRoutes')

module.exports = {
    allgames: (req, res) => {
        Game.find().then((game) => {
                if (game.length === 0) {
                    return res.status(200).json({
                        comfirmation: 'success',
                        message: 'lib empty'
                    })
                }
                return res.status(200).json({
                    comfirmation: 'success',
                    game
                })
            })
            .catch(err => {
                res.status(500).json({
                    comfirmation: 'failed',
                    message: 'server error'
                })
            })
    },

    singlegames: (req, res) => {
        Game.findOne({
            name: req.params.name
        }).then(game => {
            if (game) {
                return res.status(200).json({
                    comfirmation: 'success',
                    game
                })

            } else {
                return res.status(404)
                    .json({
                        comfirmation: 'success',
                        message: 'NO GAMES FOUND'
                    })
            }
        }).catch(err => {
            res.status(500).json({
                comfirmation: 'failed',
                message: 'server error'
            })
        })

    },


    creategames: (req, res) => {
        const {
            name,
            description,
            yearReleased,
            playTime,
            secret
        } = req.body


        if (name === null || description === null || yearReleased === null || playTime === null || secret === null) {
            return res.status(504).json({
                comfirmation: 'failed',
                message: 'MISSING DATA'
            })
        }

        Game.findOne({
            name: name
        }).then((game) => {
            if (game) {
                return res
                    .status(404)
                    .json({
                        comfirmation: 'failed',
                        message: 'game exist'
                    })
            }

            let newGame = new Game({
                name,
                description,
                yearReleased,
                playTime,
                secret
            })
   
            return newGame.save().then((game) => {
                    return res.status(200).json({
                        comfirmation: 'success',
                        message: ` added ${game}`
                    })
                }).catch(err => res.json({
                    comformation: 'failed',
                    message: 'game not saved'
                }))
                .catch(err => {
                    res.status(500).json({
                        comfirmation: 'failed',
                        message: 'server error'
                    })
                })


        })
    },

    updategames: (req, res) => {
        const {
            name,
            description,
            yearReleased,
            playTime
        } = req.body

        Game.findOne({name:req.params.name}).then(game => {
            if (game){
                const {
                    name,
                    description,
                    yearReleased,
                    playTime
                } = req.body

                game.name = name ? name : game.name
                game.description = description ? description : game.description
                game.yearReleased = yearReleased ? yearReleased : game.yearReleased
                game.playTime = playTime ? playTime: game.playTime
                game.save().then((game) => {
                   return res.status(200).json({ comfirmation : 'success' , message : 'game info updated' ,game})
                })
        
            }else {
               return res.status(200).json({comfirmation: 'success' , message : 'game not found'})
            }
        
        }).catch(err => {
           res.status(404).json({message: 'server error'})
        })


    },
    deletegames: (req, res) => {

        const id = req.params.id
        Game.findByIdAndDelete(id).then(game => {
            if (game){
            return res.status(200).json({comfirmation: 'success' , message : 'game deleted'})
            }
            return res.status(200).json({comfirmation: 'success' , message : 'game not found'})
        }).catch(err => {
            res.status(404).json({comfirmation: 'fail' , message: 'server error'})
        })
    },
    enter: (req, res) => {
        
        Game.findOne({name:req.params.name}).then(game => {
            if(game.secret === req.body.secret){
              
                res.redirect('/api/enter')
            }else{
                res.redirect('/api/noentry')
            }
        }).catch(err => {
            res.status(404).json({comfirmation: 'fail' , message: 'server error'})
        })
    }
    
}



