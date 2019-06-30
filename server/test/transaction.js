const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Trans = require('../models/transactionModel');
const { createToken } = require('../helpers/jwt');

chai.use(chaiHttp);

let tokenCust5 = '';
let tokenadminCoffeeMe = '';
let userIdCust5 = '';
let transactionIdSample = '';

before(done => {
    let cust5 = {
        name: 'cust5',
        email: 'cust5@gmail.com',
        password: 'cust5',
        role: ''
    }
    User.create(cust5)
        .then(user => {
            let signUser5 = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            tokenCust5 = createToken(signUser5);
            return Cart.create({
                product: "5cd90f7db3bd553e46f4cfbd",
                quantity: 2,
                customer: user._id
            })
            .then((newCart) => {
                cartCust5 = newCart._id
                custId5 = newCart.customer
                userIdCust5 = user._id
                return Trans.create({
                    cartItem : [{
                        quantity: 5,
                        product: []
                    }], 
                    customer : userIdCust5,
                    total: 90000, 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: '0123456789'            
                })
                .then(transactionSample => {
                    transactionIdSample = transactionSample._id
                })
            })
        })
        .catch(err => {
            throw err
        })

    let adminCoffeeMe = {
        name: 'adminCoffeeMe',
        email: 'adminCoffeeMe@gmail.com',
        password: 'adminCoffeeMe',
        role: '123456789'
    }
    
    User.create(adminCoffeeMe)
        .then(user => {
            let signUser = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            tokenadminCoffeeMe = createToken(signUser);
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

        Trans
        .deleteMany({}, () => { });
        
        User
        .deleteMany({}, () => { done() });
    }
})

describe('TRANSACTION CRUD', function() {
    describe('CREATE Transaction', function() { 
        it('Should send an object with status code 401 with message "Unauthenticated"', function(done){
            let newTransaction = {
                cartItem : [], 
                customer : 'qwertyuiop12345',
                total: 90000, 
                address: 'Jln Bintaro Permai no 9x', 
                phone: '0123456789'
            }
            chai.request(app)
                .post('/transactions')
                .send(newTransaction)
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
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : [], 
                    customer : userIdCust5,
                    total: 90000, 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: '0123456789'
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    done();
                })
        })
        it('Should send an error with message address: Path `address` is required.', function(done){
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : [], 
                    customer : userIdCust5,
                    total: 90000, 
                    address: null, 
                    phone: '0123456789'
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Transaction validation failed: address: Path `address` is required.');
                    done();
                })
        })
        it('Should send an error with message phone: Path `phone` is required.', function(done){
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : [], 
                    customer : userIdCust5,
                    total: 90000, 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: null
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Transaction validation failed: phone: Path `phone` is required.');
                    done();
                })
        })
        it('Should send an error if total not a number.', function(done){
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : [], 
                    customer : userIdCust5,
                    total: '90xxx000', 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: '123456789'
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    done();
                })
        })
        it('Should send an error with message customer: Path `customer` is required.', function(done){
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : [], 
                    customer : null,
                    total: 50000, 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: '123456789'
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Transaction validation failed: customer: Path `customer` is required.');
                    done();
                })
        })
        it('Should send an error with message cartItem: Path `cartItem` is required.', function(done){
            chai.request(app)
                .post('/transactions')
                .send({
                    cartItem : null, 
                    customer : userIdCust5,
                    total: 50000, 
                    address: 'Jln Bintaro Permai no 9x', 
                    phone: '123456789'
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('Transaction validation failed: cartItem: Path `cartItem` is required.');
                    done();
                })
        })
    })

    describe('READ Transaction', function() { 
        it('Should send an object with status code 401 with message "Unauthenticated"', function(done){
            chai.request(app)
                .get('/transactions')
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('Unauthenticated');
                    done();
                })
        })
        it('Should send an array of all transcation with status code 200', function(done){
            chai.request(app)
                .get('/transactions')
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
        it('Should send an array with status code 200', function(done){
            chai.request(app)
                .get(`/transactions/${userIdCust5}`)
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                })
        })
    })

    describe('UPDATE Transaction', function() {
        it('Should send an object of updated PESANAN SELESAI with status code 200', function(done) {
            chai.request(app)
                .put('/transactions/customer/'+transactionIdSample)
                .send({
                    status: 'PESANAN SELESAI',
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
        it('Should send an object with status code 401 with message "You dont have access"', function(done) {
            chai.request(app)
                .put('/transactions/admin/'+transactionIdSample)
                .send({
                    status: 'PESANAN DIKIRIM',
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('You dont have access');
                    done()
                })
        })
        it('Should send an object of updated PESANAN DIKIRIM with status code 200', function(done) {
            chai.request(app)
                .put('/transactions/admin/'+transactionIdSample)
                .send({
                    status: 'PESANAN DIKIRIM',
                })
                .set('token', tokenadminCoffeeMe)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
    describe('DELETE Transaction is prohibited', function() {
        it('Should send an object of with status code 404', function(done) {
            chai.request(app)
                .delete('/transactions/'+transactionIdSample)
                .send({
                    status: 'PESANAN SELESAI',
                })
                .set('token', tokenCust5)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404)
                    done()
                })
        })
    })
})