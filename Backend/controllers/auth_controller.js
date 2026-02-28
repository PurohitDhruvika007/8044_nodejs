import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";

export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, confirm_password, status } = req.body;

    if (password !== confirm_password)
      return res.status(400).json({ message: "Passwords do not match" });

    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
      status: status ?? true,
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    });

    res.status(201).json({ message: "Admin Registered", admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(400).json({ message: "Invalid Email" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login Successful", token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};