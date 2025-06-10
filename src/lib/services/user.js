const supabase = require("../../config/supabaseClient");

const createUser = async (user) => {
  return await supabase
    .from("users")
    .insert({
      nama: user.nama,
      email: user.email,
      password: user.password,
    })
    .select()
    .single();
};

const updateUser = async (user) => {
  return await supabase
    .from("users")
    .update({
      nama: user.nama,
      email: user.email,
      password: user.password,
    })
    .eq("user_id", user.user_id)
    .select()
    .single();
};

const getUserByCredential = async (nama, password) => {
  const key = nama.includes("@") ? "email" : "nama";
  return await supabase
    .from("users")
    .select("id_user, nama, email")
    .eq(key, nama)
    .eq("password", password)
    .maybeSingle();
};

const getUserById = async (id_user) => {
  return await supabase
    .from("users")
    .select("id_user, nama, email, password")
    .eq("id_user", id_user)
    .maybeSingle();
};

const deleteUserById = async (id_user) => {
  return await supabase
    .from("users")
    .delete()
    .eq("id_user", id_user);
};

module.exports = {
  createUser,
  updateUser,
  getUserByCredential,
  getUserById,
  deleteUserById,
};
