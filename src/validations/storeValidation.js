const Joi = require('joi');

// ===== store data =====
const storeSchemas = {
    addRiwayat: Joi.object({
        id_user: Joi.number().required(),
        id_soal: Joi.number().required()
    }),
}

module.exports = storeSchemas;