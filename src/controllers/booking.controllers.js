const { getAllBookings, removeBooking, updateBooking, getOneBooking, createBooking } = require('../services/booking.services')
const catchError = require('../utils/catchError')

const getAll = catchError(async(req, res) => {
    const result = await getAllBookings()
    return res.status(200).json(result)
})

const create = catchError(async(req, res) => {
    const result = await createBooking(req.body)
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params 
    const result = await getOneBooking(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const result = await removeBooking(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateBooking(id, req.body)
    if(!result[0] === 0) return res.sendStatus(404).json("Not found")
    return res.json(result[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}