const supabase = require('../../config/supabaseClient');

const getUserHistory = async (id_user) => {
  const { data, error } = await supabase
    .from('view_riwayat_soal')
    .select('*')
    .eq('id_user', id_user);

  return { data, error };
};

const getSingleHistory = async (id_soal) => {
  const { data, error } = await supabase
    .from('view_riwayat_soal')
    .select('*')
    .eq('id_soal', id_soal)
    .single();

  return { data, error };
};

module.exports = {
  getUserHistory,
  getSingleHistory
};
