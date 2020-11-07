const { use } = require('../routes')
const UsersService = require('../services/users.service')

class UserController {
    async getUsers(req, res) {
        const users = await UsersService.getUsers()
        return res.status(200).json(users)
    }
    async craeteUser(req, res) {
        if (req.body.username) {
            const user = await UsersService.createUser(req.body.username)
            return res.status(200).json(user)
        } else {
            return res.status(400).json({message: 'Bad request'})
        }
    }
}

module.exports = new UserController()