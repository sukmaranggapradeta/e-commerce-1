const Trans = require('../models/transactionModel');

module.exports = function (req, res, next) {
    try {
        Trans.findById(req.params.transId)
            .then((transaction) => {
                if(!transaction){
                    next({ status: 400, messages: 'not found' })
                }else
                if (transaction && req.decoded.id == transaction.customer) {
                    next()
                } else {
                    next({ status: 401, messages: 'You dont have access' })
                }
            })
            .catch(err => {
                res.status(404).json({ msg: err.message })
            })
    } catch (error) {
        throw 'You dont have access'
    }
} 

