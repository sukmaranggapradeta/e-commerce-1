const Route = require('express').Router()
const ProductController = require('../controllers/productController')
const isAdmin = require('../middlewares/authorizeAdmin')
const gcsMiddlewares = require('../middlewares/uploadImage')
const Multer = require('multer');
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

Route.get('/', ProductController.gets)
Route.post('/', isAdmin, ProductController.create)
Route.put('/:id', isAdmin, ProductController.update)
Route.delete('/:id', isAdmin, ProductController.delete)
Route.post('/image/upload', multer.single('image'), gcsMiddlewares.uploadSingle, ProductController.uploadImage)

module.exports = Route