const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

const User = require('../models/userModel');
const Product = require('../models/productModel');
const { createToken } = require('../helpers/jwt');

chai.use(chaiHttp);

let token = '';

before(done => {
    let newUser = {
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: '123456789'
    }
    User.create(newUser)
        .then(user => {
            let signUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            token = createToken(signUser);
        })
        .catch(err => {
            throw err
        })

    let newUser2 = {
        name: 'cust3',
        email: 'cust3@gmail.com',
        password: 'cust3',
        role: ''
    }
    User.create(newUser2)
        .then(user => {
            let signUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            tokenCustomer = createToken(signUser);
            done()
        })
        .catch(err => {
            throw err
        })
})

after(done => {
    if (process.env.NODE_ENV === 'test'){
        Product
        .deleteMany({}, () => { });
     
       User
        .deleteMany({}, () => { done() });   
    }
})

describe('PRODUCTS CRUD', function() {
    describe('CREATE Product', function() {
        it('Should send an object with status code 201', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('image_url');
                    expect(res.body).to.have.property('stock');
                    expect(res.body.name).to.equal('ES KOPI POKAT');
                    expect(res.body.description).to.equal('Expresso dan Alpukat ditambah es krim cokelat');
                    expect(res.body.price).to.equal(28000);
                    expect(res.body.image_url).to.equal('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4');
                    expect(res.body.stock).to.equal(100);
                    done();
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })
        it('should send an object with status code 401 with message "You dont have access"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
        it('should send an object with status code 400 with message "Product validation failed: name: Name is required"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Product validation failed: name: Name is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "Product validation failed: description: Description is required"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Product validation failed: description: Description is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "Product validation failed: price: Price is required"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: null,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: 100
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Product validation failed: price: Price is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "Product validation failed: stock: Stock is required"', function(done){
            chai.request(app)
                .post('/products')
                .send({
                    name: "ES KOPI POKAT",
                    description: "Expresso dan Alpukat ditambah es krim cokelat",
                    price: 28000,
                    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs3BTxjlkoxA5b178qjzeX9B04NxGpBA1CS25L2rg1GES3a5d4",
                    stock: null
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Product validation failed: stock: Stock is required');
                    done();
                })
        })



    })
    describe('READ Product', function() {
        it('Should send an array with status code 200', function(done) {
            chai.request(app)
                .get('/products')
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            chai.request(app)
                .get('/products')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })

    })

    describe('UPDATE Product', function() {
        it('Should send an object of updated with status code 200', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .put('/products/'+id)
                .send({
                    price: 38000,
                })
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .put('/products/'+id)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })
        it('should send an object with status code 401 with message "You dont have access"', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .put('/products/'+id)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
    })

    describe('DELETE Product', function() {
        it('Should send an object of deleted with status code 200', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .delete('/products/'+id)
                .set('token', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .delete('/products/'+id)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })
        it('should send an object with status code 401 with message "You dont have access"', function(done) {
            let id = '5cd90f7db3bd553e46f4cfbd'
            chai.request(app)
                .delete('/products/'+id)
                .set('token', tokenCustomer)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
    })
})
