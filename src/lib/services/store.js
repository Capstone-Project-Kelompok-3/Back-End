/* eslint-disable no-unused-vars */
const supabase = require('../supabase'); // pastikan koneksi Supabase disiapkan di sini

const saveMathProbeTxt = async({id_user, soal}) => {
  try {
    const { data, error } = await supabase
      .from('soal')
      .insert([
        {
          id_user,
          soal,
          waktu_input: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error) {
    return { error: { message: error.message } };
  }
}

const saveMathResult = async ({ id_soal, jawaban, langkah_penyelesaian }) => {
  try {
    const { data, error } = await supabase
      .from('hasil_perhitungan')
      .insert([
        {
          id_soal,
          jawaban,
          langkah_penyelesaian
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return { data };
  } catch (error) {
    return { error: { message: error.message } };
  }
};

module.exports = {
  saveMathProbeTxt,
  saveMathResult
};
