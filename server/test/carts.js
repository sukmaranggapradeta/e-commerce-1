const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const { createToken } = require('../helpers/jwt');

chai.use(chaiHttp);

let tokenCust1 = '';
let tokenCust2 = '';
let cartId1 = '';
let userId = ''

before(done => {
    let cust1 = {
        name: 'cust1',
        email: 'cust1@gmail.com',
        password: 'cust1',
        role: ''
    }
    User.create(cust1)
        .then(user => {
            let signUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            tokenCust1 = createToken(signUser);
            return Cart.create({
                product: "5cd90f7db3bd553e46f4cfbd",
                quantity: 2,
                customer: user._id
            })
            .then((newCart) => {
                cartId1 = newCart._id
                custId1 = newCart.customer
                // console.log(newCart)
                // console.log(cartId1, "cart id")
                // console.log(user._id, "user._id")
                // console.log(custId1)
                userId = user._id
            })
        })
        .catch(err => {
            throw err
        })

    let cust2 = {
        name: 'cust2',
        email: 'cust2@gmail.com',
        password: 'cust2',
        role: ''
    }
    User.create(cust2)
        .then(user => {
            let signUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            tokenCust2 = createToken(signUser);
            done()
        })
        .catch(err => {
            throw err
        })
})

after(done => {
    if (process.env.NODE_ENV === 'test'){
        Cart
        .deleteMany({}, () => { });
    
        User
        .deleteMany({}, () => { done() });
    }
})

describe('CART CRUD', function() {
    describe('CREATE Cart', function() { 
        it('Should send an object with status code 401 with message "Unauthenticated"', function(done){
            let userCart = {
                productId: "5cd90f7db3bd553e46f4cfbd",
                quantity: 2,
                customerId: "1cd90f7db3bd553e46f4cfac"
            }
            chai.request(app)
                .post('/carts')
                .send(userCart)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })
        it('Should send an object with status code 201', function(done){
            let userCart = {
                productId: "5cd90f7db3bd553e46f4cfbd",
                quantity: 2,
                customerId: "1cd90f7db3bd553e46f4cfac"
            }
            chai.request(app)
                .post('/carts')
                .send(userCart)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('quantity');
                    expect(res.body.quantity).to.equal(2);
                    done();
                })
        })
        it('Should send an object with status code 400 with message "Cart validation failed: quantity: Quantity min 1"', function(done){
            let userCart = {
                productId: "5cd90f7db3bd553e46f4cfbd",
                quantity: null,
                customerId: "1cd90f7db3bd553e46f4cfac"
            }
            chai.request(app)
                .post('/carts')
                .send(userCart)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Cart validation failed: quantity: Quantity min 1');
                    done();
                })
        })
        it('Should send an object with status code 400 when Quantity not a number', function(done){
            let userCart = {
                productId: "5cd90f7db3bd553e46f4cfbd",
                quantity: 'asd',
                customerId: "1cd90f7db3bd553e46f4cfac"
            }
            chai.request(app)
                .post('/carts')
                .send(userCart)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    done();
                })
        })

        it('Should send an object with status code 400 with message "Cart validation failed: quantity: Quantity cant be negative"', function(done){
            let userCart = {
                productId: "5cd90f7db3bd553e46f4cfbd",
                quantity: -1,
                customerId: "1cd90f7db3bd553e46f4cfac"
            }
            chai.request(app)
                .post('/carts')
                .send(userCart)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal("Cart validation failed: quantity: Quantity can't be negative");
                    done();
                })
        })
    })
    describe('READ Cart', function() { 
        it('Should send an array with status code 200', function(done) {
            chai.request(app)
                .get('/carts/'+cartId1+'/'+custId1)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            chai.request(app)
                .get('/carts/'+cartId1+'/'+custId1)
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
            chai.request(app)
                .get('/carts/'+cartId1+'/'+cartId1)
                .set('token', tokenCust2)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
        it('should send an object with status code 400 with message "not found"', function(done) {
            chai.request(app)
                .get('/carts/'+custId1+'/'+custId1)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('not found');
                    done();
                })
        })
    })
    describe('UPDATE Cart', function() {
        it('Should send an object of updated with status code 200', function(done) {
            chai.request(app)
                .put('/carts/'+cartId1)
                .send({
                    productId: "5cd90f7db3bd553e46f4cfbd",
                    quantity: 3,
                    customerId: userId
                    })
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            chai.request(app)
                .put('/carts/'+cartId1)
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
            chai.request(app)
                .put('/carts/'+cartId1)
                .set('token', tokenCust2)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
        it('should send an object with status code 400 with message "not found"', function(done) {
            chai.request(app)
                .put('/carts/5cd90f7db3bd553e46f4cfbd')
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('not found');
                    done();
                })
        })
    })
    describe('DELETE Cart', function() {
        it('should send an object with status code 401 with message "Unauthenticated"', function(done) {
            chai.request(app)
                .delete('/carts/'+cartId1)
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
            chai.request(app)
                .delete('/carts/'+cartId1)
                .set('token', tokenCust2)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done();
                })
        })
        it('Should send an object of updated with status code 200', function(done) {
            chai.request(app)
                .delete('/carts/'+cartId1)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('should send an object with status code 400 with message "not found"', function(done) {
            chai.request(app)
                .delete('/carts/'+cartId1)
                .set('token', tokenCust1)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('not found');
                    done();
                })
        })


    })
})