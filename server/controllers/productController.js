const Product = require('../models/productModel')
// const deleteFileImage = require('../middlewares/deleteImage')

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

    static findOne(req, res, next) {
        let productId = req.params.id
        console.log(req.body, " ini findone req body - -- --- -")
        let imageBefore = req.body
        Product.findById(productId)
            .then((productFound) => {
                console.log(productFound, " --- productFound")
                req.deleteUrlImage = productFound.image_url
                req.image_before = imageBefore
                // res.status(200).json(productFound)
                next()
            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('masuk update')
        let id = req.params.id
        let dataUpdate = req.body
        Product.findByIdAndUpdate(id, dataUpdate, { new: true })
            .then((updated) => {
                console.log(updated, "update sukses")
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then((deleted) => {
                console.log(deleted, " deleted ---------")
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