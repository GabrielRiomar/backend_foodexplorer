//Import express Router
const { Router } = require('express')

//Import controllers
const SessionsController = require('../controllers/SessionsController')

//Creating instance for Sessions
const sessionsController = new SessionsController()
const sessionsRoutes = Router()

//Sessions routes
sessionsRoutes.post('/', sessionsController.create)

module.exports = sessionsRoutes
