import jwt from "jsonwebtoken";
import User from "../model/user.js";

// Middleware function for JWT authentication
const jwtAuthMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return next(new Error("Please login to access this resource"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export { jwtAuthMiddleware, generateToken };
