const knex = require('../database/knex')
const AppError = require('../utils/AppError')

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

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.json()
  }
}

module.exports = DishesManagerController
