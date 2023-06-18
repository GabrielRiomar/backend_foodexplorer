//Import express Router
const { Router } = require('express')

//Import Multer and config for image upload
const multer = require('multer')
const uploadConfig = require('../config/upload')

//Import controllers
const DishesController = require('../controllers/DishesController')
const DishPreviewImageController = require('../controllers/DishPreviewImageController')

//Import middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

//Variable for upload
const upload = multer(uploadConfig.MULTER)

//Creating instance for Dishes
const dishesController = new DishesController()
const dishPreviewImageController = new DishPreviewImageController()
const dishesRoutes = Router()

//Using middleware for every route bellow
dishesRoutes.use(ensureAuthenticated)

//Dishes routes
dishesRoutes.post('/', upload.single('image'), dishesController.create)
dishesRoutes.put('/:id', upload.single('image'), dishesController.update)
dishesRoutes.get('/', dishesController.index)
dishesRoutes.get('/:id', dishesController.show)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.patch(
  '/:id',
  ensureAuthenticated,
  upload.single('image'),
  dishPreviewImageController.update
)

module.exports = dishesRoutes
