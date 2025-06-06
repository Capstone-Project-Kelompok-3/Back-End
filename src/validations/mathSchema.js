const Joi = require('joi');

// ===== math probe =====
const mathSchemas = {
    questionText: Joi.object({
        id_user: Joi.number().required(),
        soal: Joi.string().required()
    }),

    questionImage: Joi.object({
        id_user: Joi.string()
            .required()
            .description('ID dari user yang mengupload gambar'),

        image: Joi.any()
            .required()
            .meta({ swaggerType: 'file' })
            .description('File gambar untuk dianalisis'),
    })

}

module.exports = mathSchemas;