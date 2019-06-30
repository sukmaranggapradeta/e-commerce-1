const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const transactionSchema = new Schema ({
    cartItem: {
        type: [],
        required: true
    },
    customer: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: String,
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, { timestamps: true })

transactionSchema.pre('save', function (next) {
    this.status = 'PESANAN DIPROSES'
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction