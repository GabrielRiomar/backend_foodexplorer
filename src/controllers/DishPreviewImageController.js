const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishPreviewImageController {
  async update(request, response) {
    const { id } = request.params

    const previewImgFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (!dish) {
      throw new AppError(
        'You can only change preview from an existent item',
        401
      )
    }

    if (dish.preview_img) {
      await diskStorage.deleteFile(dish.preview_img)
    }

    const filename = await diskStorage.saveFile(previewImgFilename)
    dish.preview_img = filename

    await knex('dishes').update(dish).where({ id })

    return response.json(dish)
  }
}

module.exports = DishPreviewImageController
