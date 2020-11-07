const db = require('../core/db.core')

class UsersService {
    async getUsers() {
        const users = await db.query('SELECT * FROM users')
        return users.rows
    }

    async createUser(username) {
        const check = await this.getUser(username)
        if (check) {
            return false
        } else {
            const user = await db.query('INSERT INTO users(username) VALUES($1) RETURNING *', [username])
            return user.rows[0]
        }
    }

    async getUser(username) {
        const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
        if (user.rows.length > 0) {
            return user.rows[0]
        } else {
            return false
        }
    }

    async deleteUser(username) {
        const check = await this.getUser(username)
        if (check) {
            await db.query('DELETE FROM users WHERE username = $1', [username])
            return true
        } else {
            return false
        }
    }
}

module.exports = new UsersService()