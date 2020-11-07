const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')

const PORT = 8000
const app = express()

app.use(morgan('tiny'))


app.use('/api', routes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})
