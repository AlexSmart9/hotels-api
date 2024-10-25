const { getAllReviews, getOneReview, updateReview, removeReview, createReview } = require('../services/review.services')
const catchError = require('../utils/catchError')

const getAll = catchError(async(req, res) => {
    const result = await getAllReviews()
    return res.status(200).json(result)
})

const create = catchError(async(req, res) => {
    const result = await createReview(req.body)
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params 
    const result = await getOneReview(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const result = await removeReview(id)
    if(!result) return res.sendStatus(404).json("Not found")
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateReview(id, req.body)
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