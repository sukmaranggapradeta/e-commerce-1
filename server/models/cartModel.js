const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        min: [0,`Quantity can't be negative`],
        required: [true, 'Quantity min 1'],
    },
    customer: {
        type: ObjectId,
        ref: 'User'
    }
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart