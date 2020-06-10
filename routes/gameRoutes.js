const express = require('express')
const games = require('../models/games')
const router = express.Router()


router.get('/' , (req , res) => {

        return res.status(200).json({ confirmation: 'success' ,games})
    })



router.get('/getAllGames' ,(req,res) => {
    if (games.length === 0) {
        return res.status(404).json({comfirmation: 'fail' , message: 'NO GAMES FOUND'})
    }
return res
.status(200)
.json({comfirmation: 'SUCCESS' , games})
})

router.get('/getSingleGame/:name' ,(req,res) => {
    const game = games.filter(game => game.name === req.params.name)
    if (game.length === 0) {
        return res.status(404).json({comfirmation: 'fail' , message: 'NO GAMES FOUND'})
    }
return res
.status(200)
.json({comfirmation: 'SUCCESS' , game})
})


router.post('/createGame' , (req , res) => {

    if(!req.body.name || !req.body.description){
        return res.status(400).json({ comfirmation : 'failed' ,message: 'MISSING DATA'})
    }

    const game = games.filter(game => game.name === req.body.name)

    if(game.length > 0) {
        return res.status(400)
        .json({comfirmation : 'failed' , message: 'Game already exist'})
    }

    let newGame = {
        id: games.length + 1,
        name: req.body.name,
        description: req.body.description,
        yearReleased: req.body.yearReleased ? req.body.yearReleased : N/A ,
        playTime: req.body.playTime ? req.body.playTime : N/A
    }
    games.push(newGame)
    return res.status(201).json({message : 'updated' , games})

})


router.put('/updateGame/:name' ,(req , res) => {
    const game = games.filter(game => game.name === req.params.name)
    let updatedGames = req.body

    if(game.length > 0){
        games[game[0].id-1].name = updatedGames.name ? updatedGames.name : game.name
        games[game[0].id-1].description = updatedGames.description ? updatedGames.description : game.name
        games[game[0].id-1].yearReleased = updatedGames.yearReleased ? updatedGames.yearReleased : game.yearReleased
        games[game[0].id-1].playTime = updatedGames.playTime ? updatedGames.playTime : game.playTime
        return res.status(200).json({comfirmation: 'updated' , games})
    }
    return res.status(404).json({comfirmation: 'Failed' , message: 'Game not found'})
})

router.delete('/deleteGame/:name' , (req,res)=> {
    const game = games.filter(game => game.name === req.params.name)
    if (game.length > 0 ){
        games.splice(game[0].id -1,1)

        ///////////////// fix game id after delete
        const reorder = () => {
            for (let i = 0; i < games.length ; i++){
                games[i].id = i +1
            }
        }
        reorder()
        /////////////////////
        return res.status(200).json({comfirmation: 'updated' , games})
    }
    return res.status(404).json({comfirmation: 'Failed' , message: 'Game not found',game})
})


module.exports = router