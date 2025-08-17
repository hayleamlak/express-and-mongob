const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a user by ID
// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body; // <--- Important: data from Postman
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,           // returns the updated document
      runValidators: true, // validates schema rules
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Bad Request", error: err.message });
  }
});


// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
