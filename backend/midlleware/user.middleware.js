const jwt = require("jsonwebtoken");
const JWT_token = require("../config");
const jwtVerify = async (req, res, next) => {
  const authorize = req.headers.authorization;
  if (authorize || authorize.startsWith("Bearer ")) {
    const token = authorize.split(" ")[1];
    if (token) {
      try {
        const decode = jwt.verify(token, JWT_token);
        req.user = decode._id;
        next();
      } catch (error) {
        return res.status(401).json({ message: error.message });
      }
    } else {
      return res.status(401).json({ error: "Token not provided" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = jwtVerify;
