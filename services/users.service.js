const db = require('../core/db.core')

class UsersService {
    async getUsers() {
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }
}

module.exports = new UsersService()