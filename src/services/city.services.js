const {city} = require('../models')

const getAllCities = async () => {
    return await city.findAll()
}

const createCity = async (body) => {
    return await city.create(body)
}

const getOneCity = async (id) => {
    return await city.findByPk(id)
}

const removeCity = async (id) => {
    return await city.destroy({where:{id}})
}

const updateCity = async (id, body) => {
    return await city.update(
        body,
        {where: {id}, returning: true}
    )
}

module.exports = {
    getAllCities,
    createCity,
    getOneCity,
    removeCity,
    updateCity
}