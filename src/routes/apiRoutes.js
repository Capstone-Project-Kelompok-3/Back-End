/* eslint-disable no-unused-vars */
const mathController = require('../controllers/mathController');
const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');

const failAction = (request, h, err) => {
  return h.response({ error: err.details[0].message }).code(400).takeover();
};

const routes = [

];

module.exports = routes;