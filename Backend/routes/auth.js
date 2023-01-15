const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const tokenCheck = require("../middleware/tokenCheck");
const router = express.Router();
const User = require("../models/user");
const response={
  sucess:"false",
  message:""
}
const maxAge = 24 * 60 * 60;

const generateToken = (id) => {
  const token = jwt.sign({ id }, "this is tokens", { expiresIn: maxAge });
  return token;
};

//Sign Up  using :POST "/api/uth/createuser". NO login required .
router.post(
  "/signup",
  [
    body("name", "name should be min 3 letter").isLength({ min: 3 }),
    body("email", "email is not valid ").isEmail(),
    body("password", "password should be min 4 letter").isLength({ min: 4 }),
  ],
  async (req, res) => {
    //  if there is error ,returning the error with status of bas request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.sucess="false"
      response.message="Validation error"
      return res.status(400).json({ response,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        response.sucess="false"
        response.message="email is already exist in database"
        return res
          .status(400)
          .json({response, error: "Sorry a user with this email already exists" });
      }
      // Create a new user
      user = await User.create(req.body);
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      response.sucess="true"
        response.message="Sucessfully signup"
      res.json({response,token});
    } catch (error) {
      console.log(error);
      response.sucess="false"
      response.message="Internal error"
      res.status(500).json({response,error});
    }
  }
);

// route for login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.sucess="false"
      response.message="Validation error"
      return res.status(400).json({ response,errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        response.sucess="false"
        response.message="Invalid credencials"
        return res
          .status(400)
          .json({ response,error: "Please try to login with correct credentials" });
      }
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
        response.sucess="false"
        response.message="Invalid credencials"
        res.status(400).json({ response,error: "Invalid credencials" });
      }

      const token = generateToken(user._id);
      res.cookie("jwt", token);
      response.sucess="true"
        response.message="successfully login"
      res.json({ response,token });
    } catch (error) {
      response.sucess="false"
      response.message="Invalid credencials"
      res.json({response,error});
      console.log("Invalid credencials");
    }
  }
);
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/userCheck", tokenCheck, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    response.sucess="true"
    response.message="successfully login"
    res.json({response,user});
  } catch (error) {
    console.log(error);
    response.sucess="false"
      response.message="Invalid credencials"
    res.status(500).json({response,error:"Internal Server Error"});
  }
});

module.exports = router;
