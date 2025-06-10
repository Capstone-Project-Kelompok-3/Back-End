const Joi = require('joi');

const storeSchemas = {
    storeSolve: Joi.object({
        soal: Joi.string().required(),
        langkahPenyelesaian: Joi.string().required(),
    }),
}

module.exports = storeSchemas;