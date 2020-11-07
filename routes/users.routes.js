const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.controller')

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser)
    .delete(UserController.deleteUser)

router.route('/:id')
    .get((req, res) => {
        res.send('Getting user with id ' + req.params.id)
    })
    .put((req, res) => {
        res.send('Updating user with id ' + req.params.id)
    })
    .delete((req, res) => {
        res.send('Deleting user with id ' + req.params.id)
    })

module.exports = router