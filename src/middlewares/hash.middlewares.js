const bcrypt = require('bcrypt')

const hash = async(req,res,next) => {
    const {password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    req.passwordHash = hashPassword

    next()
}

module.exports = hash