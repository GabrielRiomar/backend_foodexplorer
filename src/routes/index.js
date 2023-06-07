const { Router } = require('express')

const usersRoutes = require('./users.routes.js')
const dishesRoutes = require('./dishes.routes.js')
const dishesManagerRoutes = require('./dishesManager.routes.js')
const ingredientsRoutes = require('./ingredients.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/manager', dishesManagerRoutes)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/sessions', sessionsRoutes)

module.exports = routes
