const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE a new user
router.post("/", async (req, res) => {
  console.log("POST /users body:", req.body); // Debug log
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

// READ all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// READ single user by ID
router.get("/:id", async (req, res) => {
  console.log("GET /users/:id params:", req.params); // Debug log
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

// UPDATE user by ID
router.put("/:id", async (req, res) => {
  console.log("PUT /users/:id params:", req.params, "body:", req.body); // Debug log
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

// DELETE user by ID
router.delete("/:id", async (req, res) => {
  console.log("DELETE /users/:id params:", req.params); // Debug log
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});

module.exports = router;
