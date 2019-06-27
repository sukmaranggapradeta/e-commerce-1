require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const url = `mongodb://localhost/e-commerce-${process.env.NODE_ENV}`
const errHandling = require('./middlewares/errHandling')
const myRoutes = require('./routes/myRoutes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', myRoutes)
app.use(errHandling)

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) console.log('Database not connect!')
    else console.log(`Database connected`)
})
app.listen(port, () => {
    console.log(`server running at port ` + port)
    })
    
module.exports = app