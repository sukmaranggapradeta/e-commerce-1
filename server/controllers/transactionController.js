const Trans = require('../models/transactionModel')
const nodemailer = require('nodemailer')

class TransactionController {
    static create(req, res, next) {
        let { cartItem, customer, total, address, phone } = req.body
        Trans.create({
            cartItem, customer, total, address, phone
        })
        .then((newTransaction) => {
            res.status(201).json(newTransaction)
            // console.log(newTransaction)
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port : 587,
                secure : false,
                auth: {
                    user: 'eagerfoxhacktiv8demo@gmail.com',
                    pass: 'bethebesteager'
                }
            });
            let mailOptions = {
                from: '"CoffeeMe" eagerfoxhacktiv8demo@gmail.com', // sender address
                to: `cozylobali@gmail.com`, // list of receivers
                subject: 'CoffeeMe', // Subject line
                text: `Pesanan Baru`, // plain text body
                html: `<b>Your Order has been send</b>
                <span>more info visit this <a href="http://coffeeme.sukmaranggapradeta.com/transactions">link</a></span>` // html body
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                })
        })
        .catch(next)
    }

    static get(req, res, next) {
        Trans.find({})
        .populate('customer')
        .then((transactions) => {
            res.status(200).json(transactions)
        })
        .catch(next)
    }

    static getMyTransaction(req, res, next) {
        let custId = req.params.custId
        Trans.find({
            customer: custId
        })
        .populate('customer')
        .then((myTrans) => {
            res.status(200).json(myTrans)
        })
        .catch(next)
    }

    static update(req, res, next){
        let transId = req.params.transId
        let status = req.body
        Trans.findByIdAndUpdate(transId, status, {new:true})
        .populate('customer')
        .then((updated) => {
            // console.log(updated)
            if (status === 'PESANAN DIKIRIM') {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port : 587,
                    secure : false,
                    auth: {
                        user: 'eagerfoxhacktiv8demo@gmail.com',
                        pass: 'bethebesteager'
                    }
                });
                let mailOptions = {
                    from: '"CoffeeMe" eagerfoxhacktiv8demo@gmail.com', // sender address
                    to: `${updated.customer.email}`, // list of receivers
                    subject: 'CoffeeMe', // Subject line
                    text: `Pesanan Dikirim`, // plain text body
                    html: `<b>Your Order has been send</b>
                    <span>more info visit this <a href="http://coffeeme.sukmaranggapradeta.com/orders">link</a></span>` // html body
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    })
            }
            if (status === 'PESANAN SELESAI') {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port : 587,
                    secure : false,
                    auth: {
                        user: 'eagerfoxhacktiv8demo@gmail.com',
                        pass: 'bethebesteager'
                    }
                });
                let mailOptions = {
                    from: '"CoffeeMe" eagerfoxhacktiv8demo@gmail.com', // sender address
                    to: `cozylobali@gmail.com`, // list of receivers
                    subject: 'CoffeeMe', // Subject line
                    text: `Pesanan Selesai`, // plain text body
                    html: `<b>Pesanan telah selesai</b>
                    <span>more info visit this <a href="http://coffeeme.sukmaranggapradeta.com/transactions">link</a></span>` // html body
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error)
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                    })
            }
            res.status(200).json(updated)
        })
        .catch(next)
    }

}

module.exports = TransactionController