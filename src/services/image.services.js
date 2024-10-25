const {image} = require('../models')

const getAllImages = async () => {
    return await image.findAll()
}

const createImage = async (body) => {
    return await image.create(body)
}

const getOneImage = async (id) => {
    return await image.findByPk(id)
}

const removeImage = async (id) => {
    return await image.destroy({where:{id}})
}

const updateImage = async (id, body) => {
    return await image.update(
        body,
        {where: {id}, returning: true}
    )
}

module.exports = {
    getAllImages,
    createImage,
    getOneImage,
    removeImage,
    updateImage
}