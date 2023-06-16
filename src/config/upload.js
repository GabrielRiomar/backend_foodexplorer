//Import path to use __dirname
const path = require('path')

//Import multer library for upload
const multer = require('multer')

//Import crypto to create hash names
const crypto = require('crypto')

//Variable to create folder to place temporary files
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')

//Variable to create folder to place files
const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, 'upload')

//Variable to create the file for uploading
const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER
}
