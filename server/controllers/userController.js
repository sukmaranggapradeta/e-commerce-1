const User = require('../models/userModel')
const { verifyPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        // console.log('masuk register')
        let { name, email, password, role } = req.body
        if (role === null || role === undefined) {
            role = 'customer'
        }
        User.create({
            name, email, password, role
        })
        .then((newUser) => {
            // console.log(newUser)
            res.status(201).json(newUser)
        })
        .catch(next)
    }

    static login(req, res, next) {
        // console.log('masuk login')
        let { email, password } = req.body
        User.findOne({
            email
        })
        .then(found => {
            // console.log("masuk found")
            if (found && verifyPassword(password, found.password)) {
                // console.log('masuk if found')
                let access_token = createToken({ id: found.id, email: found.email , role: found.role })
                res.status(200).json({
                    token: access_token,
                    id: found.id,
                    name: found.name,
                    email: found.email,
                    role: found.role
                });
            } else {
                next({ status: 400, messages: 'email/password wrong!' })
            }
        })
        .catch(next)
    }
}

module.exports = UserController