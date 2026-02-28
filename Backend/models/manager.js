import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  name: String,
  email: String,
  salary: String,
  designation: String,
  status: Boolean,
  created_date: String,
  updated_date: String
});

export const Manager = mongoose.model("Manager", ManagerSchema);