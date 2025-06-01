/* eslint-disable no-undef */
const axios = require('axios');
const FormData = require('form-data');
const { saveMathProbeTxt, saveMathResult } = require('./store');

const ML_BASE_URL = process.env.ML_BASE_URL || 'http://localhost:5000';

const processTextQuestion = async (soal, id_user) => {
  try {
    const { data } = await saveMathProbeTxt({id_user, soal: question})
    const response = await axios.post(`${ML_BASE_URL}/solve`, { question });
    const { jawaban, langkah_penyelesaian } = response.data;

    await saveMathResult({ id_soal: data.id_soal, jawaban, langkah_penyelesaian });
    return { data: { id_soal: data.id_soal, jawaban, langkah_penyelesaian } };
  } catch (error) {
    return { error: { message: error.response?.data?.message || error.message } };
  }
};

const processImageQuestion = async (imageBuffer, id_user) => {
  try {
    const formData = new FormData();
    formData.append('image', imageBuffer, 'question.png');

    const response = await axios.post(`${ML_BASE_URL}/solveImage`, formData, {
      headers: formData.getHeaders()
    });

    const { soal, jawaban, langkah_penyelesaian } = response.data;
    const { data } = await saveMathProbeTxt({id_user, soal})
    await saveMathResult({ id_soal: data.id_soal, jawaban, langkah_penyelesaian });
    return { data: { id_soal: data.id_soal, jawaban, langkah_penyelesaian, soal } };
  } catch (error) {
    return { error: { message: error.response?.data?.message || error.message } };
  }
};

module.exports = {
  processTextQuestion,
  processImageQuestion
};

