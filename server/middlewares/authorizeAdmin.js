module.exports = function (req, res, next) {
    // console.log(req.decoded.role, "======= role")
    if (req.decoded.role === 'admin') {
        next()
    } else {
        next({ status: 401, messages: 'You dont have access' })
    }
} 

