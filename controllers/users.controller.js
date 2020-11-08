const UsersService = require('../services/users.service')

async function getUsers(req, res) {
    const users = await UsersService.getUsers()
    return res.status(200).json(users)
}

async function createUser(req, res) {
    if (req.body.username) {
        const user = await UsersService.createUser(req.body.username)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json({message: 'Cant create this user'})    
        }
    } else {
        return res.status(400).json({message: 'Bad request'})
    }
}

async function getUserByID(req, res) {
    const user = await UsersService.getUserByID(req.params.id)
    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json({message: 'Cant find user'})
    }
}

async function updateUserByID(req, res) {
    const user = await UsersService.updateUserByID(req.params.id, req.body.username)
    if (user) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json({message: 'Cant update user'})
    }
}

async function deleteUserByID(req, res) {
    await UsersService.deleteUserByID(req.params.id)
    return res.status(200).json({message: 'User was deleted'})
}

module.exports = {getUsers, createUser, getUserByID, updateUserByID, deleteUserByID}