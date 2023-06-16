const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async create({ name, email, password }) {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('E-mail already in use.', 401)
    }

    if (password.length < 6) {
      throw new AppError('Password should have a minimum of 6 characters.', 400)
    }

    const hashedPassword = await hash(password, 8)
    const userCreated = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return userCreated
  }

  async update({ id, name, email, password, old_password }) {
    const checkUserExists = await this.usersRepository.show({ id })

    if (!checkUserExists) {
      throw new AppError('User not found.', 401)
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

    name = name ?? checkUserExists.name
    email = email ?? checkUserExists.email

    if (
      userWithUpdatedEmail &&
      userWithUpdatedEmail.id !== checkUserExists.id
    ) {
      throw new AppError('E-mail already in use by another user.', 401)
    }

    if (!password && old_password) {
      throw new AppError('Please, inform your New Password', 401)
    }

    if (password && !old_password) {
      throw new AppError('Please, inform your Old Password', 401)
    }

    if (password && old_password) {
      const checkOldPassword = await compare(
        old_password,
        checkUserExists.password
      )

      if (!checkOldPassword) {
        throw new AppError('Password does not match', 401)
      }
      password = await hash(password, 8)
    }

    await this.usersRepository.update({ id, name, email, password })

    return
  }
}

module.exports = UsersService
