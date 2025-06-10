const {
  getUserHistory,
  getSingleHistory
} = require('../lib/services/history');

const historyController = {
  getHistory: async (request, h) => {
    const { id_user } = request.auth;

    const { data, error } = await getUserHistory(id_user);
    if (error) {
      return h.response({
        message: 'Gagal mengambil riwayat soal~',
        error
      }).code(500);
    }

    return h.response({
      message: 'Berhasil mengambil riwayat soal~ (＾▽＾)',
      data
    }).code(200);
  },

  getHistoryById: async (request, h) => {
    const { id_soal } = request.params;

    const { data, error } = await getSingleHistory(id_soal);
    if (error) {
      return h.response({
        message: 'Riwayat soal tidak ditemukan~ (；▽；)',
        error
      }).code(404);
    }

    return h.response({
      message: 'Berhasil mengambil detail soal~',
      data
    }).code(200);
  }
};

module.exports = historyController;
