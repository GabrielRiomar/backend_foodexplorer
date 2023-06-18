//Import express Router
const { Router } = require('express')

//Import controllers
const UsersController = require('../controllers/UsersController')

//Import middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

//Creating instance for Users
const usersController = new UsersController()
const usersRoutes = Router()

//User routes
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)

module.exports = usersRoutes
