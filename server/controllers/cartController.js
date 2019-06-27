const Cart = require('../models/cartModel')

class CartController {
    static create(req, res, next){
        let { product, quantity, customer } = req.body
        Cart.create({
            product, quantity, customer
        })
        .then((newCart) => {
            res.status(201).json(newCart)
        })
        .catch(next)
    }

    static get(req, res, next){
        let customerId = req.params.customerId
        Cart.find({
            customer : customerId
        })
        .then((customerCart) => {
            // console.log(customerCart)
            res.status(200).json(customerCart)
        })
        .catch(next)
    }

    static update(req, res, next){
        // console.log('masuk update')
        let id = req.params.id
        let dataUpdate = req.body
        Cart.findByIdAndUpdate(id, dataUpdate, {new:true})
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req, res, next){
        let id = req.params.id
        Cart.findByIdAndDelete(id)
        .then((deleted) => {
            res.status(200).json(deleted)
        })
        .catch(next)
    }
}

module.exports = CartController