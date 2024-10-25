const bcrypt = require('bcrypt')
const { loginServices } = require('../services/user.services')

const loginMiddlewares = async(req, res, next) => {
    const {email, password} = req.body

    const user = await loginServices(email)
    if(!user) return res.sendStatus(401)

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) return res.sendStatus(401)
    
    req.userLogged = user

    next()

}

module.exports= loginMiddlewares