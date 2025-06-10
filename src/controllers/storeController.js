const {
  saveMathProbeTxt,
  saveMathResult
} = require("../lib/services/store");

const storeController = {
  saveSolve: async (request, h) => {
    const { soal, langkah_penyelesaian } = request.payload;
    const { id_user } = request.auth;

    if (!soal || !langkah_penyelesaian) {
      return h.response({ message: "Soal dan langkah penyelesaian wajib diisi~!" }).code(400);
    }

    // Simpan soal-nyaa duluu~
    const { data: soalData, error: soalError } = await saveMathProbeTxt({ id_user, soal });
    if (soalError) {
      return h.response({ message: "Gagal menyimpan soal~ (>_<)", error: soalError }).code(500);
    }

    const id_soal = soalData.id_soal;

    // Simpan hasil penyelesaian~!
    const { data: hasilData, error: hasilError } = await saveMathResult({ id_soal, langkah_penyelesaian });
    if (hasilError) {
      return h.response({ message: "Gagal menyimpan hasil perhitungan~", error: hasilError }).code(500);
    }

    return h.response({
      message: "Berhasil menyimpan soal dan hasilnya~ (≧▽≦)",
      soal: soalData,
      hasil: hasilData
    }).code(201);
  }
};

module.exports = storeController;
