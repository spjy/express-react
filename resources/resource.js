const router = require('express').Router();

const mongoose = require('mongoose');
const models = require('../models');

router.post(
  '/resource',
  async (req, res, next) => {
    try {
      // function
    } catch (error) {
      next(error);
    }

    return next();
  }
);
