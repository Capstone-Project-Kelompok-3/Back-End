const supabase = require('../../config/supabaseClient'); // pastikan koneksi Supabase disiapkan di sini

const saveMathProbeTxt = async({id_user, soal}) => {
  try {
    const { data, error } = await supabase
      .from('soal')
      .insert([
        {
          id_user,
          soal,
          waktu_input: new Date().toISOString(), 
          created_at: new Date().toISOString()
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

const saveMathResult = async ({ id_soal, langkahPenyelesaian }) => {
  try {
    const { data, error } = await supabase
      .from('hasil_perhitungan')
      .insert([
        {
          id_soal,
          langkah_penyelesaian: langkahPenyelesaian,
          created_at: new Date().toISOString()
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

const saveHistory = async ({ id_user, id_soal }) => {
  try {
    const { data, error } = await supabase
      .from('riwayat_soal')
      .insert([
        {
          id_soal,
          id_user,
          created_at: new Date().toISOString()
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

module.exports = {
  saveMathProbeTxt,
  saveMathResult,
  saveHistory
};
