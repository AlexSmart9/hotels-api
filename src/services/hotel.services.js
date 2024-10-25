const {hotel, city, image} = require('../models')

const getAllHotels = async () => {
    return await hotel.findAll({include:[city, image]})
}

const createHotel = async (body) => {
    return await hotel.create(body)
}

const getOneHotel = async (id) => {
    return await hotel.findByPk(id, {include:[city, image]})
}

const removeHotel = async (id) => {
    return await hotel.destroy({where:{id}})
}

const updateHotel = async (id, body) => {
    return await hotel.update(
        body,
        {where: {id}, returning: true}
    )
}

module.exports = {
   getAllHotels,
   createHotel,
   getOneHotel,
   removeHotel,
   updateHotel
}