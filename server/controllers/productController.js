const Product = require('../models/productModel')

class ProductController {
    static create(req, res, next) {
        let { name, description, price, image_url, stock } = req.body
        Product.create({
            name, description, price, image_url, stock
        })
            .then((newProduct) => {
                res.status(201).json(newProduct)
            })
            .catch(next)
    }

    static gets(req, res, next) {
        Product.find({})
            .then((products) => {
                res.status(200).json(products)
            })
            .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.id
        let dataUpdate = req.body
        Product.findByIdAndUpdate(id, dataUpdate, { new: true })
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }

    static uploadImage(req, res, next) {
        if (req.file && req.file.cloudStoragePublicUrl) {
            return res.send(req.file.cloudStoragePublicUrl);
        }
        return res.status(500).send('Unable to upload');
    }

}
module.exports = ProductController