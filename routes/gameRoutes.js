const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController')
const secretRouter = require('./mainRoutes')
const correctSecret = require('./authRoutes.js')
const snarky = require('../middleswares/snarky')


router.get('/getAllGames' ,snarky, gameController.allgames)
router.get('/getSingleGame/:name' ,snarky, gameController.singlegames)
router.post('/createGame' , snarky,gameController.creategames)
router.put('/updateGame/:name' ,snarky, gameController.updategames)
router.delete('/deleteGame/:name' ,snarky, gameController.deletegames)
router.get('/enter/:name',snarky, gameController.enter)
router.get('/enter',snarky, correctSecret.enter)
router.get('/noentry',snarky, secretRouter.noentry)

module.exports = router