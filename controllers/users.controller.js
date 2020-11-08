const { use } = require('../routes')
const UsersService = require('../services/users.service')

class UserController {
    async getUsers(req, res) {
        const users = await UsersService.getUsers()
        return res.status(200).json(users)
    }

    async createUser(req, res) {
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

    async getUserByID(req, res) {
        const user = await UsersService.getUserByID(req.params.id)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json({message: 'Cant find user'})
        }
    }

    async updateUserByID(req, res) {
        const user = await UsersService.updateUserByID(req.params.id, req.body.username)
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json({message: 'Cant update user'})
        }
    }

    async deleteUserByID(req, res) {
        await UsersService.deleteUserByID(req.params.id)
        return res.status(200).json({message: 'User was deleted'})
    }
}

module.exports = new UserController()