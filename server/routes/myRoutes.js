const Route = require('express').Router()
const UserController = require('../controllers/userController')
const productRoutes =  require('../routes/productRoutes')
const cartRoutes = require('../routes/cartRoute')
const transactionRoutes = require('../routes/transactionRoute')
const isLogin = require('../middlewares/authenticate')

Route.post('/login', UserController.login)
Route.post('/register', UserController.register)

Route.use('/products', isLogin, productRoutes)
Route.use('/carts', isLogin, cartRoutes)
Route.use('/transactions', isLogin, transactionRoutes)

module.exports = Route