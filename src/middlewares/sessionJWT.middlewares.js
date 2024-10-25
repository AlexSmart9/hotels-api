const jwt = require('jsonwebtoken')

const sessionJWT = (req, res, next) => {
    const userLogged = req.userLogged

    const token = jwt.sign(
        {userLogged},
        process.env.TOKEN_SECRET,
        {expiresIn: '1d'}
    )

    req.token = token 
    next()
}

module.exports = sessionJWT