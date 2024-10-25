const { getAllCities, getOneCity, updateCity, removeCity, createCity } = require('../services/city.services')
const catchError = require('../utils/catchError')

const getAll = catchError(async(req, res) => {
    const result = await getAllCities()
    return res.status(200).json(result)
})

const create = catchError(async(req, res) => {
    const result = await createCity(req.body)
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params 
    const result = await getOneCity(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const result = await removeCity(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateCity(id, req.body)
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