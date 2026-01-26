import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;  // Get data from request

   // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password (SECURITY!)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user in database
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "Account created successfully" });
};

// signin logic
export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({ token, user: { id: user._id, fullName: user.fullName } });
};
