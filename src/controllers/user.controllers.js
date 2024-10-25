

const { getAllUsers, createUser, getOneUSer, removeUser, updateUser } = require('../services/user.services')
const catchError = require('../utils/catchError')

const getAll = catchError(async(req, res) => {
    const results = await getAllUsers()
    return res.status(200).json(results)
})

const create = catchError(async(req, res) => {
    const result = await createUser({...req.body, password: req.passwordHash})
    return res.status(201).json(result)
})

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const result = await getOneUSer(id)
    if(!result) return res.sendStatus(404)
    return res.status(200).json(result)
})

const remove = catchError(async(req, res) => {
    const {id} = req.params
    const result = await removeUser(id)
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204)
})

const update = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateUser(id, req.body)
    if(result[0] === 0) return res.sendStatus(404)
    return res.status(200).json(result[1][0])
})

const login = catchError(async(req, res) => {
    const user = req.userLogged
    const token = req.token
    return res.json({user, token})
})

const logged = catchError(async(req, res) => {
    const user = req.user
    return res.json(user)
})
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    logged
}