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

const getUserByCredential = async (name, password) => {
  const key = name.includes("@") ? "email" : "name";
  return await supabase
    .from("users")
    .select("user_id, name, email")
    .eq(key, name)
    .eq("password", password)
    .maybeSingle();
};

const getUserById = async (user_id) => {
  return await supabase
    .from("users")
    .select("user_id, name, email, password")
    .eq("user_id", user_id)
    .maybeSingle();
};

const deleteUserById = async (user_id) => {
  return await supabase
    .from("users")
    .delete()
    .eq("user_id", user_id);
};

module.exports = {
  createUser,
  updateUser,
  getUserByCredential,
  getUserById,
  deleteUserById,
};
