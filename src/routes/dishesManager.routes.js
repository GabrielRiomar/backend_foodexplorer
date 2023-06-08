//Import express Router
const { Router } = require('express')

//Import controllers
const DishesManagerController = require('../controllers/DishesManagerController')
const DishPreviewImageController = require('../controllers/DishPreviewImageController')

//Import middlewares
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

//Import Multer and config for image upload
const multer = require('multer')
const uploadConfig = require('../config/upload')

//Creating instance for DishesManager
const dishesManagerRoutes = Router()
const dishesManagerController = new DishesManagerController()
const dishPreviewImageController = new DishPreviewImageController()

//Variable for upload
const upload = multer(uploadConfig.MULTER)

//Using middleware for every route bellow
dishesManagerRoutes.use(ensureAuthenticated)
//DishesManager routes
dishesManagerRoutes.post(
  '/',
  upload.single('preview_img'),
  dishesManagerController.create
)
dishesManagerRoutes.put('/:id', dishesManagerController.update)
dishesManagerRoutes.delete('/:id', dishesManagerController.delete)
dishesManagerRoutes.patch(
  '/:id',
  ensureAuthenticated,
  upload.single('preview_img'),
  dishPreviewImageController.update
)

module.exports = dishesManagerRoutes
