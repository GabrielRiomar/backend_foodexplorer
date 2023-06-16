const knex = require('../database/knex')

class DishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body

    const checkDishNameExists = await knex('dishes').where('name', name).first()

    if (checkDishNameExists) {
      throw new AppError('Dish name already on use.', 401)
    }

    const image = request.file.filename

    const diskStorage = new DiskStorage()

    const imageFile = await diskStorage.saveFile(image)

    const dish_id = await knex('dishes').insert({
      name,
      category,
      price,
      description,
      image: imageFile
    })

    const hasOnlyOneIngredient = typeof ingredients === 'string'

    const ingredientsInsert = hasOnlyOneIngredient
      ? {
          name: ingredients,
          dish_id
        }
      : ingredients.map(ingredient => ({
          name: ingredient,
          dish_id
        }))

    await knex('ingredients').insert(ingredientsInsert)

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, category, price, description, ingredients } = request.body
    const { id } = request.params

    const image = request.file ? request.file.filename : null
    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (!dish) {
      throw new AppError("Dish doesn't exists or not found", 401)
    }

    // Deleting the old image if a new image is uploaded and saving the new image
    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    // Caso ainda não exista
    const filename = await diskStorage.saveFile(dishFilename)

    dish.name = name ?? dish.name
    dish.category = category ?? dish.category
    dish.price = price ?? dish.price
    dish.description = description ?? dish.description
    dish.image = image ?? dish.image

    await knex('dishes')
      .where({ id })
      .update({
        name: dish.name,
        category: dish.category,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        updated_at: knex.raw("DATETIME('NOW')")
      })

    return response.status(200).json()
  }

  async delete(request, response) {
    const { id } = request.params

    await knex('dishes').where({ id }).delete()

    return response.json()
  }
  async show(request, response) {
    const { id } = request.params
    const dish = await knex('dishes').where({ id }).first()
    const ingredients = await knex('ingredients')
      .where({ dish_id: id })
      .orderBy('name')

    return response.status(200).json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    let dishes

    if (ingredients) {
      const filteredIngredients = ingredients
        .split(',')
        .map(ingredient => ingredient.trim())

      dishes = await knex('ingredients')
        .select([
          'dishes.id',
          'dishes.name',
          'dishes.price',
          'dishes.category',
          'dishes.image',
          'dishes.price'
        ])
        .whereLike('dishes.name', `%${name}%`)
        .whereIn('name', filteredIngredients)
        .innerJoin('dishes', 'dishes.id', 'ingredients.dish_id')
        .orderBy('dishes.name')
    } else {
      dishes = await knex('dishes').whereLike('name', `%${name}%`)
    }

    const dishesIngredients = await knex('ingredients')
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredient = dishesIngredients.filter(
        ingredient => ingredient.dish_id === dish.id
      )

      return {
        ...dish,
        ingredients: dishIngredient
      }
    })

    return response.status(200).json(dishesWithIngredients)
  }
}

module.exports = DishesController
