/* eslint-disable no-unused-vars */
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
    .eq("id_user", user.id_user)
    .select()
    .single();
};

const getUserByCredential = async (nama, password) => {
  try {
    const key = nama.includes("@") ? "email" : "nama";

    const { data: user, error } = await supabase
      .from("users")
      .select("id_user, nama, password, email")
      .eq(key, nama)
      .maybeSingle();

    if (error) {
      return { data: null, error };
    }

    if (!user || password !== user.password) {
      return {
        data: null,
        error: new Error("Invalid credentials"),
      };
    }

    return {
      data: {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
      },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: new Error("Internal server error"),
    };
  }
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
