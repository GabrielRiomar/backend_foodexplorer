const { Router } = require('express')
const DishesController = require('../controllers/DishesController')
const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)

module.exports = dishesRoutes
