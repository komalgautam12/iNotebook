const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// createing schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

//expporting model

// pre method is fire before save method

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw Error(error);
  }
});
const user = mongoose.model("user", userSchema);
module.exports = user;
