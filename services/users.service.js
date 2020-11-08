const db = require('../core/db.core')
db.connect()

async function getUsers() {
    const users = await db.query('SELECT * FROM users')
    return users.rows
}

async function createUser(username) {
    const check = await checkUsername(username)
    if (check) {
        return false
    } else {
        const user = await db.query('INSERT INTO users(username) VALUES($1) RETURNING *', [username])
        return user.rows[0]
    }
}

async function getUserByID(id) {
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

async function updateUserByID(id, username) {
    try {
        const check = await checkUsername(username)
        if (check) {
            return false
        } else {
            const user = await db.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, id])
            return user.rows[0]
        }
    } catch (err) {
        return false
    }
}

async function deleteUserByID(id) {
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id])
        return true
    } catch (err) {
        return false
    }
}

async function checkUsername(username) {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [username])
    if (user.rows.length > 0) {
        return user.rows[0]
    } else {
        return false
    }
}

module.exports = {getUsers, createUser, getUserByID, updateUserByID, deleteUserByID}