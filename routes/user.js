const express = require('express');
const {signup , login , createProduct , product} = require('../controllers/user')
const {upload} = require('../middleware/multer')

const router = express.Router()



router.post('/' , signup)
router.post('/login', login)
router.post('/product' , upload.single('file') , createProduct)
router.get('/product' , product)

module.exports = router