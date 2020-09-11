const jwt = require("jsonwebtoken");

// Enable use of environmental variables
require("dotenv").config();

const expiration = 60 * 60;

const createToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
  return token;
};

const generateToken = (req, res, next) => {
  req.token = createToken(req.user);
  return next();
};

const sendToken = (req, res) => {
  // res.setHeader("x-auth-token", req.token);
  res.cookie("jwt", req.token, {
    httpOnly: true,
    maxAge: expiration * 1000,
  });
  return res.status(200).send(req.user);
};

module.exports = { generateToken, sendToken };
