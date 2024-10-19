const { JWT_SECRET } = require("../backend/config");
const jwt = require("jsonwebtoken");

const autoMiddleware = (req, res, next) => {
  const autoheader = req.headers.authorization;
  if (!autoheader || !autoheader.startsWith("Bearer ")) {
    return res.status(403).json({
      error: "probablby missing token",
    });
  }
  let token = autoheader.split(" ")[1];
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (e) {
    return res.json({
      error: e,
    });
  }
};

module.exports = { autoMiddleware };
