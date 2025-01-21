const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validatePassword } = require("../utils/validations");
const validate = require("validator");

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    if (firstName === "" || lastName === "") {
      throw new Error("First Name and Last Name are required");
    }
    if (firstName.trim().length < 3 || lastName.trim().length < 3) {
      throw new Error(
        "First Name and Last Name must be atleast 3 characters long"
      );
    }
    if (validate.isEmail(emailId) === false) {
      throw new Error("Invalid Email");
    }
    const validPassword = validatePassword(password);
    if (!validPassword.isValid) {
      throw new Error(validPassword.error);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.signJWTToken();
    res.cookie("token", token);
    res.json({ message: "User added succesfully", data: savedUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req?.body;
    const isValidUser = await User.findOne({ emailId: emailId });
    if (!isValidUser) {
      throw new Error("Invalid credintials");
    } else {
      const isValidPassword = await isValidUser.checkIsPasswordvalid(password);
      if (isValidPassword) {
        const token = await isValidUser.signJWTToken();
        res.cookie("token", token);
        res.send(isValidUser);
      } else {
        throw new Error("Invalid credintials");
      }
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(0),
  });
  res.send("Logout succesfull");
});

module.exports = authRouter;
