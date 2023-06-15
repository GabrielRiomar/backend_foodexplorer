const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishPreviewImageController {
  async update(request, response) {
    const { id } = request.params

    const imageFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (!dish) {
      throw new AppError(
        'You can only change preview from an existent item',
        401
      )
    }

    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    const filename = await diskStorage.saveFile(imageFilename)
    dish.image = filename

    await knex('dishes').update(dish).where({ id })

    return response.json(dish)
  }
}

module.exports = DishPreviewImageController
