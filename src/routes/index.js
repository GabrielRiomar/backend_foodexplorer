const { Router } = require('express')

const usersRoutes = require('./users.routes.js')
const dishesRoutes = require('./dishes.routes.js')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)

module.exports = routes
