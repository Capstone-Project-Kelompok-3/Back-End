const Joi = require('joi');

// ===== HISTORY =====
const historySchema = {
    getById: Joi.object({
        id_soal: Joi.string().required().label('ID Soal')
    })
};

module.exports = historySchema;