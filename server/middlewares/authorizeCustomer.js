const Cart = require('../models/cartModel');

module.exports = function (req, res, next) {
    try {
        Cart.findById(req.params.id)
            .then((cart) => {
                // console.log(cart, "ini cart")
                // console.log('masuk auth cust')
                // console.log(cart.customer, " ==== ", req.decoded.id)
                if(!cart){
                    // console.log('masuk if !cart')
                    next({ status: 400, messages: 'not found' })
                }else
                if (cart && req.decoded.id == cart.customer) {
                    // console.log('next')
                    next()
                } else {
                    // console.log('you dont have access')
                    // console.log(cart)
                    // console.log("============")
                    // console.log(req.decoded.id)
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

