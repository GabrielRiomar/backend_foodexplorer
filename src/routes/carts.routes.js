//Import express Router
const { Router } = require('express')

//Import controllers
const CartsController = require('../controllers/CartController')

//Import middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

//Creating instance for Carts
const cartsController = new CartsController()
const cartsRoutes = Router()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post('/', cartsController.create)
cartsRoutes.put('/:id', cartsController.update)
cartsRoutes.get('/', cartsController.index)
cartsRoutes.delete('/:id', cartsController.delete)

module.exports = cartsRoutes
