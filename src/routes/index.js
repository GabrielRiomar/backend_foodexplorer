const { Router } = require('express')

const usersRoutes = require('./users.routes.js')
const dishesRoutes = require('./dishes.routes.js')
const cartsRoutes = require('./carts.routes.js')
const ingredientsRoutes = require('./ingredients.routes')
const sessionsRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/carts', cartsRoutes)
routes.use('/ingredients', ingredientsRoutes)
routes.use('/sessions', sessionsRoutes)

module.exports = routes
