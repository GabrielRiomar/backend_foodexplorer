//To help with files import
const fs = require('fs')
//Import path to use __dirname
const path = require('path')
//Import config to upload
const uploadConfig = require('../config/upload')

class DiskStorage {
  //change files folder
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOAD_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage
