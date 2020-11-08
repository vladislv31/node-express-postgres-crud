const db = require('../core/db.core')

class UsersService {
    async getUsers() {
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }

    async createUser(username) {
        const check = await this.checkUsername(username)
        if (check) {
            return false
        } else {
            const user = await db.query('INSERT INTO users(username) VALUES($1) RETURNING *', [username])
            return user.rows[0]
        }
    }

    async getUserByID(id) {
        const users = await db.query('SELECT * FROM users WHERE id = $1', [id])
        if (users.rows.length > 0) {
            return users.rows
        } else {
            return false
        }
    }

    async checkUsername(username) {
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
        if (user.rows.length > 0) {
            return user.rows[0]
        } else {
            return false
        }
    }
}

module.exports = new UsersService()