const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const veriifyJWT = require('../utils/verifyJWT');

const cityRouter = express.Router();

cityRouter.route('/')
    .get(getAll)
    .post(veriifyJWT, create);

cityRouter.route('/:id')
    .get(veriifyJWT, getOne)
    .delete(veriifyJWT, remove)
    .put(veriifyJWT, update);

module.exports = cityRouter;