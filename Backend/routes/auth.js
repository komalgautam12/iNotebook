const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const tokenCheck=require("../middleware/tokenCheck")
const router = express.Router();
const User = require("../models/user");

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
    body("email", "email is valid ").isEmail(),
    body("password", "password should be min 4 letter").isLength({ min: 4 }),
  ],
  async (req, res) => {
    //  if there is error ,returning the error with status of bas request

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.create(req.body);
      const token = generateToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

// route for login

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
      const verifyPassword = bcrypt.compare(req.body.password, user.password);
      if (verifyPassword) {
        const token = generateToken(user._id);
        res.cookie("jwt", token);
        res.send("Successfully login");
      } else {
        res.send("Invalid credencials");
      }
    }
  } catch (error) {
    res.send(error);
    console.log("Invalid credencials");
  }
});

router.post("/userCheck",tokenCheck ,async (req,res)=>{
try {
  console.log(req.id)
 const user=await User.findById(req.user.id)
 res.json(user)
} catch (error) {
  console.log(error)
}

})


module.exports = router;
