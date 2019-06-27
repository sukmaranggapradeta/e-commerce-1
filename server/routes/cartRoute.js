const Route = require('express').Router()
const cartController = require('../controllers/cartController')
const isCustomer = require('../middlewares/authorizeCustomer')

Route.get('/:id/:customerId', isCustomer, cartController.get)
Route.post('/', cartController.create)
Route.put('/:id', isCustomer, cartController.update)
Route.delete('/:id', isCustomer, cartController.delete)

module.exports = Route