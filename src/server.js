//Import dotEnv envrioment variables
require('dotenv/config')
require('express-async-errors')
const express = require('express')
const AppError = require('./utils/AppError')
const routes = require('./routes')
const uploadConfig = require('./config/upload')

//Import cors to receive FrontEnd requisitions
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER))

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, () =>
  console.log(`Server is running on Port ${PORT} for this one`)
)
