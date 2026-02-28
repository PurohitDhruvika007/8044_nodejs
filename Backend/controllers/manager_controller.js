import { Manager } from "../models/manager.js";

export const createManager = async (req, res) => {
  const manager = await Manager.create({
    ...req.body,
    created_date: new Date().toISOString(),
    updated_date: new Date().toISOString()
  });
  res.json(manager);
};

export const getAllManagers = async (req, res) => {
  const managers = await Manager.find();
  res.json(managers);
};

export const updateManager = async (req, res) => {
  const updated = await Manager.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updated_date: new Date().toISOString() },
    { new: true }
  );
  res.json(updated);
};

export const deleteManager = async (req, res) => {
  await Manager.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
};

export const searchManager = async (req, res) => {
  const { email } = req.body;
  const data = await Manager.find({
    email
  });
  res.json(data);
};

export const paginationManager = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const data = await Manager.find().skip(skip).limit(limit);
  const total = await Manager.countDocuments();

  res.json({
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data
  });
};


export const multipleDelete = async (req, res) => {
  await Manager.deleteMany(req.body);
  res.json({ message: "Multiple Records Deleted" });
};