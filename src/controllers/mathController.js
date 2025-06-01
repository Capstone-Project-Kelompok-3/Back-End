/* eslint-disable no-unused-vars */
const {
  processTextQuestion,
  processImageQuestion
} = require('../lib/services/math');

const mathController = {
  solveFromText: async (request, h) => {
    const { id_user, soal } = request.payload;

    const { data, error } = await processTextQuestion({id_user, soal});

    if (error) {
      return h.response({ status: 'fail', message: error.message }).code(500);
    }

    return h.response({ status: 'success', id_soal: data.id_soal, answer: data.jawaban, question: soal, step: data.langkah_penyelesaian }).code(200);
  },

  solveFromImage: async (request, h) => {
    const { id_user } = request.payload;
    const image = request.payload.image;

    const { data, error } = await processImageQuestion(image);

    if (error) {
      return h.response({ status: 'fail', message: error.message }).code(500);
    }

    return h.response({ status: 'success', id_soal: data.id_soal, answer: data.jawaban, question: data.soal, step: data.langkah_penyelesaian }).code(200);
  }
};

module.exports = mathController;
