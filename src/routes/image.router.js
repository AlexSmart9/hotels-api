const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const veriifyJWT = require('../utils/verifyJWT');

const imageRouter = express.Router();

imageRouter.route('/')
    .get(getAll)
    .post(veriifyJWT, create);

imageRouter.route('/:id')
    .get(getOne)
    .delete(veriifyJWT, remove)
    .put(veriifyJWT, update);

module.exports = imageRouter;