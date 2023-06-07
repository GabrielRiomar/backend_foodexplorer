const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesManagerController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body

    const checkDishNameExists = await knex('dishes').where('name', name).first()

    if (checkDishNameExists) {
      throw new AppError('Dish name already on use.', 401)
    }

    const [dish_id] = await knex('dishes').insert({
      name,
      category,
      price,
      description
    })

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id,
        name: ingredient
      }
    })

    await knex('ingredients').insert(ingredientsInsert)

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, category, price, description, preview_img } = request.body
    const { id } = request.params

    // Requesting image filename
    const previewFileName = request.file.filename

    // Instantiating diskStorage
    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (!dish) {
      throw new AppError("Dish doesn't exists or not found", 401)
    }

    // Deleting the old image if a new image is uploaded and saving the new image
    if (dish.preview_img) {
      await diskStorage.deleteFile(dish.preview_img)
    }

    const previewName = await diskStorage.saveFile(previewFileName)

    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description
    dish.preview_img = preview_img ?? previewName

    await knex('dishes')
      .where({ id })
      .update({
        name: dish.name,
        category: dish.category,
        price: dish.price,
        description: dish.description,
        preview_img: dish.preview_img,
        updated_at: knex.raw("DATETIME('NOW')")
      })

    return response.status(200).json()
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.json()
  }
}

module.exports = DishesManagerController
