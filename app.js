const express = require('express')
const app = express()
const morgan = require('morgan')
const gameRouter = require('./routes/gameRoutes')
require('dotenv').config()
const timer = require('./middleswares/timer')
const snarky = require('./middleswares/snarky')

const port = process.env.PORT || 8080

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(timer)
app.use(snarky)
app.use('/api' , gameRouter)




app.listen(port , () => {
    console.log(` Listening on port  ${port}`)
})
