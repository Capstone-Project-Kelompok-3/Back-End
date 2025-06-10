const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const historyController = require('../controllers/historyController');

const userSchemas = require('../validations/userSchema');
const storeSchemas = require('../validations/storeSchema');
const historySchemas = require('../validations/historySchema');

const authMiddleware = require('../lib/middleware/authMiddleware');

const failAction = (request, h, err) => {
  return h.response({ error: err.details[0].message }).code(400).takeover();
};

const routes = [
  // --------------------- HOMEPAGE ---------------------
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      const welcomeMessage = 'Welcome to our MATH APIs';
      return h.response({ status: 'success', message: welcomeMessage }).code(200);
    }
  },

  // --------------------- USERS ---------------------
  {
    method: 'POST',
    path: '/users',
    handler: userController.addUser, // plain user without roles
    options: {
      pre: [authMiddleware],
      validate: { payload: userSchemas.addUser, failAction }
    }
  },
  {
    method: 'PUT',
    path: '/users/{user_id}',
    handler: userController.updateUser,
    options: {
      pre: [authMiddleware],
      validate: { payload: userSchemas.updateUser, failAction }
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: userController.login,
    options: {
      validate: { payload: userSchemas.login, failAction }
    }
  },
  {
    method: 'GET',
    path: '/users/{user_id}',
    handler: userController.getUserInfo,
    options: {
      pre: [authMiddleware]
    }
  },
  {
    method: 'DELETE',
    path: '/users/{user_id}',
    handler: userController.deleteUser,
    options: {
      pre: [authMiddleware]
    }
  },

  // --------------------- STORES ---------------------
  {
    method: 'POST',
    path: '/store',
    handler: storeController.saveSolve,
    options: {
      pre: [authMiddleware],
      validate: { payload: storeSchemas.storeSolve, failAction }
    }
  },

  // --------------------- HISTORY ---------------------
  {
    method: 'GET',
    path: '/history',
    handler: historyController.getHistory,
    options: {
      pre: [authMiddleware]
    }
  },
  {
    method: 'GET',
    path: '/history/{id_soal}',
    handler: historyController.getHistoryById,
    options: {
      pre: [authMiddleware],
      validate: {
        params: historySchemas.getById 
      }
    }
  }

];

module.exports = routes;