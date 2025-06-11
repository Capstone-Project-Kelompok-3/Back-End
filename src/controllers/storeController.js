const {
  saveMathProbeTxt,
  saveMathResult,
  saveHistory
} = require("../lib/services/store");

const storeController = {
  saveSolve: async (request, h) => {
    const { soal, langkahPenyelesaian } = request.payload;
    const { id_user } = request.auth;

    if (!soal || !langkahPenyelesaian) {
      return h.response({ message: "Soal dan langkah penyelesaian wajib diisi~!" }).code(400);
    }

    // Simpan soal-nyaa duluu~
    const { data: soalData, error: soalError } = await saveMathProbeTxt({ id_user, soal });
    if (soalError) {
      return h.response({ message: "Gagal menyimpan soal~ (>_<)", error: soalError }).code(500);
    }

    const id_soal = soalData.id_soal;

    // Simpan hasil penyelesaian~!
    const { data: hasilData, error: hasilError } = await saveMathResult({ id_soal, langkahPenyelesaian });
    if (hasilError) {
      return h.response({ message: "Gagal menyimpan hasil perhitungan~", error: hasilError }).code(500);
    }
    
    const { data: hasilHistory, error: historyError } = await saveHistory({ id_soal, id_user });
    if (hasilError) {
      return h.response({ message: "Gagal menyimpan riwayat perhitungan~", error: hasilError }).code(500);
    }

    return h.response({
      message: "Berhasil menyimpan soal dan hasilnya~ (≧▽≦)",
      soal: soalData,
      hasil: hasilData
    }).code(201);
  }
};

module.exports = storeController;
