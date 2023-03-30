const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public')
    },
    filename: (req, file, cb) => {
      console.log('hello')
      cb(null, file.originalname)
    },
})

const upload = multer({storage:storage})
module.exports = {
  upload
} 