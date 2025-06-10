const {
  createUser,
  updateUser,
  getUserByCredential,
  getUserById,
  deleteUserById,
} = require("../lib/services/user");

const { generateToken } = require("../lib/services/jwtService");

const userController = {
  addUser: async (request, h) => {
    const user = request.payload;
    const { data, error } = await createUser(user);

    if (error) {
      return h.response({ status: "fail", message: error.message }).code(400);
    }

    return h.response({
      status: "success",
      user: { user_id: data.user_id, name: data.name, email: data.email },
    }).code(201);
  },

  updateUser: async (request, h) => {
    const { id_user } = request.auth;
    const { nama, email, password} = request.payload;
    const user = { id_user, nama, email, password };

    const { data, error } = await updateUser(user);

    if (error || !data) {
      return h.response({
        status: "fail",
        message: error?.message || "User not found",
      }).code(404);
    }

    return h.response({ status: "success", user_id: data.user_id }).code(200);
  },

  login: async (request, h) => {
    const { nama, password } = request.payload;
    const { data: user, error } = await getUserByCredential(nama, password);

    if (error || !user) {
      return h
        .response({ status: "fail", message: "Invalid credentials" })
        .code(401);
    }

    const token = generateToken({
      id_user: user.id_user,
      nama: user.nama,
    });

    return h.response({ status: "success", token, user }).code(200);
  },

  getUserInfo: async (request, h) => {
    const { id_user } = request.auth;
    const { data, error } = await getUserById(id_user);

    if (error || !data) {
      return h
        .response({ status: "fail", message: "User not found" })
        .code(404);
    }

    return h.response({ status: "success", data }).code(200);
  },

  deleteUser: async (request, h) => {
    const { id_user } = request.auth;
    const { error } = await deleteUserById(id_user);

    if (error) {
      return h.response({ status: "fail", message: error.message }).code(400);
    }

    return h.response({ status: "success", message: "User deleted" }).code(200);
  },
};

module.exports = userController;
