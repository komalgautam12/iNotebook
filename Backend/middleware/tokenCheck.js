const jwt = require("jsonwebtoken");
4;

const tokenCheck = (req, res, next) => {
  if (!req.header("jwt")) {
    res.send("token is not present");
  }
  jwt.verify(req.header("jwt"), "this is tokens", (err, decodedToken) => {
    if (err) {
      res.send("token is not  match or is tempered");
    }
    
    req.user = decodedToken;
  });
  next();
};

module.exports = tokenCheck;
