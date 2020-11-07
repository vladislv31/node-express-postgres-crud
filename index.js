const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const bodyParser = require('body-parser')

const PORT = 8000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(morgan('tiny'))


app.use('/api', routes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})
