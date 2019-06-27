const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const transactionSchema = new Schema ({
    cartItem: [],
    customer: {
        type: ObjectId,
        ref: 'User'
    },
    total: Number,
    status: String,
    address: String,
}, { timestamps: true })

transactionSchema.pre('save', function (next) {
    this.status = 'onCart'
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction