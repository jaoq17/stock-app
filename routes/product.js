const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')


router.post('/', productController.createProduct)
router.get('/', productController.getProducts)
router.delete('/:id', productController.deleteProduct)


module.exports = router