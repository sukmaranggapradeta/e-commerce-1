const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/userModel');

chai.use(chaiHttp);

const expect = chai.expect;

after(done => {
    if (process.env.NODE_ENV === 'test'){
        User
        .deleteMany({}, () => {
        done();
        })
    }
})

describe('USERS', function() {
    describe('REGISTER', function() {
        it('Should send an object with status code 201 with response body created user', function(done) {
            let user = {
                name: 'logan',
                email: 'logan@gmail.com',
                password: 'wolverine',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('password');
                    expect(res.body.email).to.be.equal('logan@gmail.com');
                    expect(res.body.password).to.not.be.equal('wolverine');
                    done();
                })
        })
        it('should send an object with status code 400 with message "User validation failed: email: Email is already registered"', function(done) {
            let user = {
                name: 'logan',
                email: 'logan@gmail.com',
                password: 'wolverine',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('User validation failed: email: Email is already registered');
                    done();
                })
        })
        it('should send an object with status code 400 with message "User validation failed: name: Name is required"', function(done) {
            let user = {
                name: '',
                email: 'naruto@gmail.com',
                password: 'naruto',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('User validation failed: name: Name is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "User validation failed: email: Email is required"', function(done) {
            let user = {
                name: 'naruto',
                email: '',
                password: 'naruto',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('User validation failed: email: Email is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "User validation failed: pasword: Password is required"', function(done) {
            let user = {
                name: 'naruto',
                email: 'naruto@gmail.com',
                password: '',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('User validation failed: password: Password is required');
                    done();
                })
        })
        it('should send an object with status code 400 with message "User validation failed: email: Invalid format email"', function(done) {
            let user = {
                name: 'naruto',
                email: 'naruto@com',
                password: 'naruto',
            }
            chai.request(app)
                .post('/register')
                .send(user)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('err');
                    expect(res.body.err).to.be.equal('User validation failed: email: Invalid format email');
                    done();
                })
        })
    })

    describe('LOGIN', function() {
        it('Should send an object with status 200', function(done) {
            let user = {
                email: 'logan@gmail.com',
                password: 'wolverine',
            }
            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(err, res){
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('token');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');         
                    done()
                })
        })
        it('Should send an object with status 400 with message "email/password wrong!"', function(done) {
            let user = {
                email: 'logan@gmail.com',
                password: 'xxxxxxxx',
            }
            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('email/password wrong!');
                    done();
                })
        })
        it('Should send an object with status 400 with message "email/password wrong!"', function(done) {
            let user = {
                email: 'xxxx',
                password: 'wolverine',
            }
            chai.request(app)
                .post('/login')
                .send(user)
                .end(function(err, res){
                    expect(err).to.be.null;
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.be.equal('email/password wrong!');
                    done();
                })
        })

    })
})