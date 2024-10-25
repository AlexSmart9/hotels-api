const {user} = require('../models')

const getAllUsers = async () => {
    return await user.findAll()
}

const createUser = async (body) => {
    return await user.create(body)
}

const getOneUSer = async (id) => {
    return await user.findByPk(id)
}

const removeUser = async (id) => {
    return await user.destroy({where: {id}})
}

const updateUser = async (id, body) => {
    return await user.update(
        body, 
        {where:{id}, returning:true}
    )
}

const loginServices = async (email) => {
    return await user.findOne({where:{email}})
}

module.exports = {
    getAllUsers,
    createUser,
    getOneUSer,
    updateUser,
    removeUser,
    loginServices
}