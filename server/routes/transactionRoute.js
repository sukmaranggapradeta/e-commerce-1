const Route = require('express').Router()
const TransactionController = require('../controllers/transactionController')
const isAdmin = require('../middlewares/authorizeAdmin')
const isOwner = require('../middlewares/authorizeTransaction')

Route.get('/', TransactionController.get)
Route.get('/:custId', TransactionController.getMyTransaction)
Route.post('/', TransactionController.create)
Route.put('/admin/:transId', isAdmin, TransactionController.update)
Route.put('/customer/:transId', isOwner, TransactionController.update)

module.exports = Route