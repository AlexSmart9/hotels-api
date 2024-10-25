const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controllers');
const express = require('express');
const veriifyJWT = require('../utils/verifyJWT');

const hotelRouter = express.Router();

hotelRouter.route('/')
    .get(getAll)
    .post(veriifyJWT, create);

hotelRouter.route('/:id')
    .get(getOne)
    .delete(veriifyJWT, remove)
    .put(veriifyJWT, update);

module.exports = hotelRouter;