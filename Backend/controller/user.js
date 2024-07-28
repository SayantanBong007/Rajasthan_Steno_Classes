import express from "express";
import User from "../model/user.js";
import UserHistory from "../model/userHistory.js";
import { generateToken } from "../utils/jwt.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

//POST route to add a user
const registerUser = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    console.log(data.fullName);

    // Create a new User document using the Mongoose model
    const newUser = await User.create({
      name: data.fullName,
      email: data.email,
      password: data.password,
      phonenumber: data.phone,
    });

    const payload = {
      id: newUser.id,
    };
    console.log(JSON.stringify(payload));

    // Generate a JWT token for the user
    const token = generateToken(payload);
    console.log("Token is:", token);

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    console.log(options);
    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user: newUser, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, "         ", password);

    const user = await User.findOne({ email });

    //If user does not exit or password does not match, return error
    if (
      !user ||
      (user.role != "admin" && !(await user.comparePassword(password)))
    ) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    //genarate Token
    const payload = {
      id: user._id,
    };

    const token = generateToken(payload);

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    // console.log("User Data:", userData);

    res.status(200).json({ success: true, user });
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
