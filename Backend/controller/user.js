import express from "express";
import User from "../model/user.js";
import UserHistory from "../model/userHistory.js";
import { generateToken } from "../jwt.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

//POST route to add a user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);

    const existingAdmin = await User.findOne({ role: "admin" });

    if (data.role === existingAdmin) {
      return res.status(403).json({
        message:
          "An admin user already exists. Only one admin user is allowed.",
      });
    }

    // Create a new User document using the Mongoose model
    const newUser = new User(data);

    // Save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));

    // Generate a JWT token for the user
    const token = generateToken(payload);
    console.log("Token is:", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //If user does not exit or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //genarate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    //return token as response
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data:", userData);

    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUserHistory = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const userHistory = await UserHistory.find({ user_id: userId }).populate(
      "test_id"
    );

    res.status(200).json(userHistory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { registerUser, loginUser, getUser, getUserHistory };
