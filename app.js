const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const gameRouter = require('./routes/gameRoutes')
require('dotenv').config()
const timer = require('./middleswares/timer')


const port = process.env.PORT || 8080

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(timer)
app.use('/api' , gameRouter)



app.listen(port , () => {
    console.log(` Listening on port  ${port}`)
})
