const {booking} = require('../models')

const getAllBookings = async () => {
    return await booking.findAll()
}

const createBooking  = async (body) => {
    return await booking.create(body)
}

const getOneBooking = async (id) => {
    return await booking.findByPk(id)
}

const removeBooking = async (id) => {
    return await booking.destroy({where:{id}})
}

const updateBooking = async (id, body) => {
    return await booking.update(
        body,
        {where: {id}, returning: true}
    )
}

module.exports = {
    getAllBookings,
    createBooking,
    getOneBooking,
    removeBooking,
    updateBooking 
}