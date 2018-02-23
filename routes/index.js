const express = require('express');
const passport = require('passport');

const router = express.Router();
const api = express.Router();

const resources = require('../resources');

api.use('/', resources);
route.use('/api', api);

module.exports = router;
