const Route = require('express').Router()
const productRoutes =  require('../routes/productRoutes')
const UserController = require('../controllers/userController')
const cartRoutes = require('../routes/cartRoute')
const isLogin = require('../middlewares/authenticate')

Route.post('/login', UserController.login)
Route.post('/register', UserController.register)

Route.use('/products', isLogin, productRoutes)
Route.use('/carts', isLogin, cartRoutes)



module.exports = Route