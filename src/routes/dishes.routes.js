//Import express Router
const { Router } = require('express')
//Import controllers
const DishesController = require('../controllers/DishesController')
//Import middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
//Creating instance for Dishes
const dishesRoutes = Router()
const dishesController = new DishesController()

//Using middleware for every route bellow
dishesRoutes.use(ensureAuthenticated)
//Dishes routes
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

module.exports = dishesRoutes
