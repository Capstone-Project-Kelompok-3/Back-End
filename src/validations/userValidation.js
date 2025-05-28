const Joi = require('joi');

// ===== USERS =====
const userSchemas = {
    addUser: Joi.object({
        nama: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().required()
    }),

    updateUser: Joi.object({
        nama: Joi.string().min(3).optional(),
        email: Joi.string().min(3).optional(),
        password: Joi.string().min(6).optional()
    }),

    login: Joi.object({
        nama: Joi.string().required(),
        password: Joi.string().required()
    }),
}

module.exports = userSchemas;