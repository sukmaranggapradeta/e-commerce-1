const Cart = require('../models/cartModel')

class CartController {
    static create(req, res, next){
        let { product, quantity, customer } = req.body
        Cart.create({
            product, quantity, customer
        })
        .then((newCart) => {
            return Cart.findById(newCart._id)
            .populate('customer')
            .populate('product')
            .then((newCartDetail) => {
                res.status(201).json(newCartDetail)
            })
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

    static getOne(req, res, next) {
        Cart.find({
            customer: req.decoded.id
        })
        .populate('customer')
        .populate('product')
        .then((carts) => {
            res.status(200).json(carts)
        })
        .catch(next)
    }

    static update(req, res, next){
        // console.log('masuk update')
        let id = req.params.id
        let dataUpdate = req.body
        Cart.findByIdAndUpdate(id, dataUpdate, {new:true})
        .populate('product')
        .populate('customer')
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req, res, next){
        let id = req.params.id
        Cart.findByIdAndDelete(id)
        .populate('product')
        .then((deleted) => {
            res.status(200).json(deleted)
        })
        .catch(next)
    }

    static deleteMany(req, res, next) {
        console.log('delete many')
        let custId = req.params.custId
        Cart.deleteMany({
            customer: custId
        })
        .then((deleted) => {
            res.status(200).json(deleted)
        })
        .catch(next)
    }
}

module.exports = CartController