const db = require('../core/db.core')

class UsersService {
    async getUsers() {
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }

    async createUser(username) {
        const user = await db.query('INSERT INTO users(username) VALUES($1) RETURNING *', [username])
        return user.rows[0]
    }
}

module.exports = new UsersService()