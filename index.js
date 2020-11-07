const express = require('express')
const morgan = require('morgan')

const PORT = 8000
const app = express()

app.use(morgan('tiny'))


app.get('/', (res, req) => {
    req.json({message: 'test'})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})
