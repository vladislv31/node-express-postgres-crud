const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.controller')

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)

router.route('/:id')
    .get(UserController.getUserByID)
    .put(UserController.updateUserByID)
    .delete(UserController.deleteUserByID)

module.exports = router