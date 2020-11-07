const { use } = require('../routes')
const UsersService = require('../services/users.service')

class UserController {
    async getUsers(req, res) {
        const users = await UsersService.getUsers()
        return res.status(200).send(users)
    }
}

module.exports = new UserController()