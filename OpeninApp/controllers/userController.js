import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

// Register user
export const registerUser = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = await User.create({ phone_number, password: hashedPassword });
    // Generate JWT token
    const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user

export const loginUser = async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    // Ensure user's password is defined
    if (!user.password) {
      return res.status(400).json({ message: "Invalid user data" });
    }
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

