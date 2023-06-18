//Import express Router
const { Router } = require('express')

//Import controllers
const IngredientsController = require('../controllers/IngredientsController')

//Creating instance for Ingredients
const ingredientsController = new IngredientsController()
const ingredientsRoutes = Router()

//Ingredients routes
ingredientsRoutes.get('/:dish_id', ingredientsController.index)

module.exports = ingredientsRoutes
