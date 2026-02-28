import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  status: Boolean,
  created_date: String,
  updated_date: String
});

export const Admin = mongoose.model("Admin", AdminSchema);