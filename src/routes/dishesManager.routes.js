const { Router } = require('express')
const DishesManagerController = require('../controllers/DishesManagerController')
const dishesManagerRoutes = Router()
const dishesManagerController = new DishesManagerController()

dishesManagerRoutes.post('/', dishesManagerController.create)

module.exports = dishesManagerRoutes
