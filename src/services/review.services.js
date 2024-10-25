const {review} = require('../models')

const getAllReviews = async () => {
    return await review.findAll()
}

const createReview = async (body) => {
    return await review.create(body)
}

const getOneReview = async (id) => {
    return await review.findByPk(id)
}

const removeReview = async (id) => {
    return await review.destroy({where:{id}})
}

const updateReview = async (id, body) => {
    return await review.update(
        body,
        {where: {id}, returning: true}
    )
}

module.exports = {
    getAllReviews,
    createReview,
    getOneReview,
    removeReview,
    updateReview
}