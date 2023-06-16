const UsersRepository = require('../repositories/UsersRepository')
const UsersService = require('../service/UsersService')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const usersService = new UsersService(usersRepository)

    await usersService.create({ name, email, password })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const usersRepository = new UsersRepository()
    const usersService = new UsersService(usersRepository)

    await usersService.update({
      id: user_id,
      name,
      email,
      password,
      old_password
    })

    return response.status(200).json()
  }
}

module.exports = UsersController
