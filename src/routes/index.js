const { Router } = require('express')

const usersRoutes = require('./users.routes.js')
const dishesRoutes = require('./dishes.routes.js')
const dishesManagerRoutes = require('./dishesManager.routes.js')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/management', dishesManagerRoutes)

module.exports = routes
