const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers');
const express = require('express');
const veriifyJWT = require('../utils/verifyJWT');

const reviewRouter = express.Router();

reviewRouter.route('/')
    .get(getAll)
    .post(veriifyJWT, create);

reviewRouter.route('/:id')
    .get(getOne)
    .delete(veriifyJWT, remove)
    .put(veriifyJWT, update);

module.exports = reviewRouter;