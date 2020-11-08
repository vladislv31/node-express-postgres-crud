const {Client} = require('pg')
const config = require('../config/db.config')

const client = new Client({
    user: config.user,
    password: config.password,
    host: config.host,
    database: config.db,
})

module.exports = client
