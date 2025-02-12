const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateUpdate, validatePassword } = require("../utils/validations");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const validate = require("validator");

profileRouter.use("/profile", userAuth);

profileRouter.get("/profile/view", async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something didnt work");
  }
});

profileRouter.patch("/profile/edit", (req, res) => {
  const isValidUpdate = validateUpdate(req);
  try {
    if (!isValidUpdate) {
      throw new Error("Send Valid Updates!");
    } else {
      if (validate.isURL(req.body.photoUrl) === false) {
        throw new Error("Invalid URL");
      }
      console.log(typeof req.body.age);
      if (isNaN(req.body.age)) {
        throw new Error("Age must be a number");
      }

      const loggedUser = req.user;
      Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
      loggedUser.save();
      res.send(loggedUser);
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/editPassword", async (req, res) => {
  try {
    const isValidPassword = validatePassword(req.body.password);
    if (!isValidPassword.isValid) {
      throw new Error(isValidPassword.error);
    } else {
      const loggedUser = req.user;
      loggedUser.password = await bcrypt.hash(req.body.password, 10);
      await loggedUser.save();
      res.send("Password updated succesfully");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
module.exports = profileRouter;
