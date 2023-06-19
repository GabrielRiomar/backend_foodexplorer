const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')

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

    const [dish_id] = await knex('dishes').insert({
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
    const imageFile = request.file

    const diskStorage = new DiskStorage()

    const dish = await knex('dishes').where({ id }).first()

    if (!dish) {
      throw new AppError("Dish doesn't exist or not found", 401)
    }

    // Deletando a imagem antiga se uma nova imagem for enviada e salvando a nova imagem
    if (dish.image) {
      await diskStorage.deleteFile(dish.image)
    }

    let imageFileName
    if (imageFile) {
      imageFileName = await diskStorage.saveFile(imageFile.filename)
      dish.image = imageFileName
    }

    dish.name = name || dish.name
    dish.category = category || dish.category
    dish.price = price || dish.price
    dish.description = description || dish.description

    await knex('dishes').where({ id }).update(dish)

    const ingredientsInsert = ingredients.map(ingredient => ({
      dish_id: dish.id,
      name: ingredient
    }))

    await knex('ingredients').where({ dish_id: id }).delete()
    await knex('ingredients').insert(ingredientsInsert)

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
