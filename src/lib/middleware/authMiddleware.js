 const { verifyToken } = require('../services/jwtService');

const authMiddleware = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return h.response({ error: 'Unauthorized: Token missing' }).code(401).takeover();
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    request.auth = {
      id_user: decoded.id_user,
      nama: decoded.name,
    };

    return h.continue;
  } catch (err ) {
    if (err.name === 'TokenExpiredError') {
      return h.response({ error: 'Expired: Token expired' }).code(401).takeover();
    }
    return h.response({ error: 'Unauthorized: Invalid token' }).code(401).takeover();
  }
};

module.exports = authMiddleware;