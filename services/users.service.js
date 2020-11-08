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
        try {
            const users = await db.query('SELECT * FROM users WHERE id = $1', [id])
            if (users.rows.length > 0) {
                return users.rows[0]
            } else {
                return false
            }
        } catch (err) {
            return false
        }
    }

    async updateUserByID(id, username) {
        try {
            const check = await this.checkUsername(username)
            if (check) {
                return false
            } else {
                const user = await db.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, id])
                console.log(user)
                return user.rows[0]
            }
        } catch (err) {
            return false
        }
    }

    async deleteUserByID(id) {
        try {
            await db.query('DELETE FROM users WHERE id = $1', [id])
            return true
        } catch (err) {
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