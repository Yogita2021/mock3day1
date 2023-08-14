const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();
// register route
userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ isError: true, msg: "User already registered" });
    }
    const hash = bcrypt.hashSync(password, 8);
    const newuser = new User({ name, email, password: hash });
    await newuser.save();
    res.status(201).json({
      isError: false,
      msg: "user registerd successfully!",
      user: newuser,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// login route

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Please login" });
    }
    const passcheck = bcrypt.compareSync(password, user.password);

    if (!passcheck) {
      return res.status(400).json({ msg: "wrong credential" });
    }
    const payload = { userID: user._id, email: user.email };
    let token = jwt.sign(payload, process.env.secrete_key, { expiresIn: "8h" });

    res
      .status(201)
      .json({ isError: false, msg: "Login sucessful!", token: token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { userRoute };
