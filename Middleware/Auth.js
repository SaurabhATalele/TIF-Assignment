import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  var token = req.headers["authorization"];
  const data = token.split(" ");
  token = data[1];
  if (!token || data[0] != "Bearer") {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
};

export default auth;
